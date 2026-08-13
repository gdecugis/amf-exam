// Minimal Google Identity Services wrapper. Exposed globally as
// window.GoogleAuth since this app has no bundler.
window.GoogleAuth = (function () {
  let idToken = localStorage.getItem("amf_id_token") || null;
  let email = localStorage.getItem("amf_email") || null;
  const listeners = [];
  let initialized = false;
  let refreshTimer = null;

  function notify() {
    const state = getState();
    listeners.forEach((fn) => fn(state));
  }

  function decodeJwtPayload(token) {
    try {
      const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(atob(base64));
    } catch (e) {
      return null;
    }
  }

  // Google ID tokens are short-lived by design (~1h) — a proof of
  // authentication, not a long-lived session. bufferSeconds lets callers
  // ask "will this be dead within the next N seconds", so refresh can
  // happen proactively instead of only after a request already failed.
  function isExpiringSoon(token, bufferSeconds) {
    if (!token) return true;
    const payload = decodeJwtPayload(token);
    if (!payload || !payload.exp) return true;
    return payload.exp <= Date.now() / 1000 + bufferSeconds;
  }

  function handleCredentialResponse(response) {
    idToken = response.credential;
    const payload = decodeJwtPayload(idToken);
    email = (payload && payload.email) || null;
    localStorage.setItem("amf_id_token", idToken);
    if (email) localStorage.setItem("amf_email", email);
    notify();
  }

  function init(clientId, attemptsLeft) {
    if (attemptsLeft === undefined) attemptsLeft = 20;
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        auto_select: false,
      });
      initialized = true;
      notify(); // wake up any effect that tried to render the button before we were ready
      startBackgroundRefresh();
      return;
    }
    // The GSI script loads with async/defer, so it may not be ready yet on
    // first mount — retry briefly instead of silently giving up forever.
    if (attemptsLeft > 0) {
      setTimeout(() => init(clientId, attemptsLeft - 1), 150);
    }
  }

  function renderButton(el) {
    if (!initialized || !window.google || !window.google.accounts || !el) return;
    try {
      el.innerHTML = "";
      window.google.accounts.id.renderButton(el, { theme: "outline", size: "medium", text: "signin_with" });
    } catch (e) {
      console.error("Google renderButton failed:", e);
    }
  }

  function signOut() {
    idToken = null;
    email = null;
    localStorage.removeItem("amf_id_token");
    localStorage.removeItem("amf_email");
    if (window.google && window.google.accounts) {
      window.google.accounts.id.disableAutoSelect();
    }
    notify();
  }

  function getState() {
    return {
      idToken,
      email,
      // "expired"/"expiringSoon" are only meaningful once signed in — a
      // clean signed-out state (no email) shouldn't read as an expired one.
      expired: Boolean(email) && isExpiringSoon(idToken, 0),
      expiringSoon: Boolean(email) && isExpiringSoon(idToken, 300),
    };
  }

  // Silently attempts to obtain a fresh ID token using the browser's
  // existing Google session (no visible UI), via GIS's prompt(). Resolves
  // with a currently-valid token, or null if none is available — either
  // because the caller was never signed in, or because silent refresh
  // wasn't possible (no active Google session, or the browser blocks the
  // required third-party context — a real risk under Safari's ITP).
  // Callers should fall back to showing the visible sign-in button on null.
  function ensureFreshToken() {
    return new Promise((resolve) => {
      if (!email) return resolve(null);
      if (!isExpiringSoon(idToken, 300)) return resolve(idToken);
      if (!initialized || !window.google || !window.google.accounts) {
        return resolve(isExpiringSoon(idToken, 0) ? null : idToken);
      }

      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        // Re-read current idToken — handleCredentialResponse may have
        // updated it via the silent flow by the time we get here.
        resolve(isExpiringSoon(idToken, 0) ? null : idToken);
      };

      // Never hang a caller indefinitely on a stalled/blocked prompt.
      const timeoutId = setTimeout(finish, 4000);

      try {
        window.google.accounts.id.prompt((notification) => {
          const cantSilentlyRefresh =
            (notification.isNotDisplayed && notification.isNotDisplayed()) ||
            (notification.isSkippedMoment && notification.isSkippedMoment());
          if (cantSilentlyRefresh) {
            clearTimeout(timeoutId);
            finish();
          }
          // Otherwise wait for either handleCredentialResponse to land
          // (silent flow succeeded) or the timeout above.
        });
      } catch (e) {
        clearTimeout(timeoutId);
        finish();
      }
    });
  }

  // Keeps the token fresh during normal active use without any user-visible
  // interruption — this is what lets a session actually last hours instead
  // of dying silently ~1h after sign-in.
  function startBackgroundRefresh() {
    if (refreshTimer) return;
    refreshTimer = setInterval(() => {
      if (email) ensureFreshToken();
    }, 5 * 60 * 1000);
  }

  function onChange(fn) {
    listeners.push(fn);
  }

  return { init, renderButton, signOut, getState, onChange, ensureFreshToken };
})();
