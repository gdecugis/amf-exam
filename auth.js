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

  function init(clientId) {
    if (!window.google || !window.google.accounts) return;
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse,
      auto_select: false,
    });
  }

  function renderButton(el) {
    if (!window.google || !window.google.accounts || !el) return;
    window.google.accounts.id.renderButton(el, { theme: "outline", size: "medium", text: "signin_with" });
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
