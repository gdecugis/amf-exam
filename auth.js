// Minimal Google Identity Services wrapper. Exposed globally as
// window.GoogleAuth since this app has no bundler.
window.GoogleAuth = (function () {
  let idToken = localStorage.getItem("amf_id_token") || null;
  let email = localStorage.getItem("amf_email") || null;
  const listeners = [];

  function notify() {
    listeners.forEach((fn) => fn({ idToken, email }));
  }

  function decodeJwtPayload(token) {
    try {
      const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(atob(base64));
    } catch (e) {
      return null;
    }
  }

  function handleCredentialResponse(response) {
    idToken = response.credential;
    const payload = decodeJwtPayload(idToken);
    email = (payload && payload.email) || null;
    localStorage.setItem("amf_id_token", idToken);
    if (email) localStorage.setItem("amf_email", email);
    notify();
  }

  let initialized = false;

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
    return { idToken, email };
  }

  function onChange(fn) {
    listeners.push(fn);
  }

  return { init, renderButton, signOut, getState, onChange };
})();
