// Authenticated personal question store: GET returns the signed-in user's
// own questions, POST adds newly generated ones. Requires a valid Google ID
// token in the Authorization header. Questions from the app owner's account
// (CANONICAL_OWNER_EMAIL) are written with owner_email = NULL, i.e. straight
// into the canonical pool everyone else reads via /api/db.
import { verifyGoogleToken, canonicalOwnerEmail } from "../_googleAuth.js";

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
}

export async function onRequestGet(context) {
  const { request, env } = context;
  if (!env.DB) return json({ questions: [], error: "D1 binding 'DB' not configured" });

  const email = await verifyGoogleToken(request, env);
  if (!email) return json({ error: "unauthorized" }, 401);

  try {
    const { results } = await env.DB.prepare(
      "SELECT id, type, question, choices, correctIndex, explanation, themeId, theme FROM questions WHERE owner_email = ?"
    ).bind(email).all();

    const questions = results.map((row) => ({ ...row, choices: JSON.parse(row.choices) }));
    return json({ questions, email });
  } catch (err) {
    return json({ questions: [], error: err.message }, 500);
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!env.DB) return json({ error: "D1 binding 'DB' not configured" }, 500);

  const email = await verifyGoogleToken(request, env);
  if (!email) return json({ error: "unauthorized" }, 401);

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: "Invalid JSON body" }, 400);
  }
  const questions = Array.isArray(body.questions) ? body.questions : [];
  if (questions.length === 0) return json({ inserted: 0 });

  const isCanonical = email === canonicalOwnerEmail(env);
  const ownerEmail = isCanonical ? null : email;

  try {
    const stmt = env.DB.prepare(
      "INSERT INTO questions (type, question, choices, correctIndex, explanation, themeId, theme, owner_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    );
    const batch = questions
      .filter((q) => q && q.question && Array.isArray(q.choices))
      .map((q) => stmt.bind(
        q.type || "A",
        q.question,
        JSON.stringify(q.choices),
        Number.isInteger(q.correctIndex) ? q.correctIndex : 0,
        q.explanation || "",
        q.themeId || 0,
        q.theme || "",
        ownerEmail
      ));
    if (batch.length > 0) await env.DB.batch(batch);
    return json({ inserted: batch.length, canonical: isCanonical });
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
