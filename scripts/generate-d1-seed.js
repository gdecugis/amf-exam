// Converts questions_db.json into a D1 seed file (d1/seed.sql).
// Run: node scripts/generate-d1-seed.js
// Then apply with: wrangler d1 execute amf-questions --file=d1/seed.sql [--remote]

const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "questions_db.json");
const OUT = path.join(__dirname, "..", "d1", "seed.sql");

function sqlEscape(str) {
  return String(str).replace(/'/g, "''");
}

function main() {
  const raw = fs.readFileSync(SRC, "utf-8");
  const questions = JSON.parse(raw);
  if (!Array.isArray(questions)) {
    throw new Error("questions_db.json must contain a top-level array");
  }

  const lines = [
    "-- Auto-generated from questions_db.json by scripts/generate-d1-seed.js",
    "-- Do not edit by hand — regenerate instead.",
    "DELETE FROM questions;",
  ];

  for (const q of questions) {
    if (!q || !q.question || !Array.isArray(q.choices)) continue;
    const type = sqlEscape(q.type || "A");
    const question = sqlEscape(q.question);
    const choices = sqlEscape(JSON.stringify(q.choices));
    const correctIndex = Number.isInteger(q.correctIndex) ? q.correctIndex : 0;
    const explanation = sqlEscape(q.explanation || "");
    const themeId = Number.isInteger(q.themeId) ? q.themeId : 0;
    const theme = sqlEscape(q.theme || "");

    lines.push(
      `INSERT INTO questions (type, question, choices, correctIndex, explanation, themeId, theme) VALUES ('${type}', '${question}', '${choices}', ${correctIndex}, '${explanation}', ${themeId}, '${theme}');`
    );
  }

  fs.writeFileSync(OUT, lines.join("\n") + "\n", "utf-8");
  console.log(`Wrote ${lines.length - 3} INSERT statements to ${OUT}`);
}

main();
