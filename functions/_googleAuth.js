// Shared helper for verifying a Google Identity Services ID token from a
// Pages Function. Not a route itself (files/dirs prefixed with "_" are
// excluded from Pages Functions routing).
const DEFAULT_CLIENT_ID = "39593401062-8631alu4ia2ev60jmjdrs23qd6ku8hm2.apps.googleusercontent.com";

export async function verifyGoogleToken(request, env) {
  const authHeader = request.headers.get("Authorization") || "";
  const idToken = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!idToken) return null;

  const expectedClientId = env.GOOGLE_CLIENT_ID || DEFAULT_CLIENT_ID;

  const res = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`);
  if (!res.ok) return null;
  const data = await res.json();

  if (data.aud !== expectedClientId) return null;
  if (!data.email || data.email_verified !== "true") return null;

  return data.email.toLowerCase();
}

export function canonicalOwnerEmail(env) {
  return (env.CANONICAL_OWNER_EMAIL || "gdecugis@gmail.com").toLowerCase();
}
