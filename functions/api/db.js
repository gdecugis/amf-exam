// Serves the canonical question pool from Cloudflare D1 (binding "DB").
// Falls back to an empty list if the binding isn't configured yet, so the
// app degrades gracefully instead of throwing during setup.
export async function onRequestGet(context) {
  const { env } = context;

  if (!env.DB) {
    return new Response(JSON.stringify({ questions: [], error: "D1 binding 'DB' not configured" }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  try {
    const { results } = await env.DB.prepare(
      "SELECT id, type, question, choices, correctIndex, explanation, themeId, theme FROM questions WHERE owner_email IS NULL"
    ).all();

    const questions = results.map((row) => ({
      ...row,
      choices: JSON.parse(row.choices),
    }));

    return new Response(JSON.stringify({ questions }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ questions: [], error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
