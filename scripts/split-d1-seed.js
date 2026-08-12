// Splits d1/seed.sql into smaller chunk files for pasting into the
// Cloudflare D1 dashboard Console (which has practical paste/size limits),
// since the dashboard has no file-import option in some accounts.
// Run: node scripts/split-d1-seed.js
// Output: d1/seed-chunks/001.sql, 002.sql, ...

const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "d1", "seed.sql");
const OUT_DIR = path.join(__dirname, "..", "d1", "seed-chunks");
const STATEMENTS_PER_CHUNK = 40;

function main() {
  const raw = fs.readFileSync(SRC, "utf-8");
  const lines = raw.split("\n").filter((l) => l.trim().length > 0);

  const deleteLine = lines.find((l) => l.trim().startsWith("DELETE FROM"));
  const insertLines = lines.filter((l) => l.trim().startsWith("INSERT INTO"));

  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const chunks = [];
  for (let i = 0; i < insertLines.length; i += STATEMENTS_PER_CHUNK) {
    chunks.push(insertLines.slice(i, i + STATEMENTS_PER_CHUNK));
  }

  chunks.forEach((chunkLines, idx) => {
    const num = String(idx + 1).padStart(3, "0");
    const body = idx === 0 && deleteLine ? [deleteLine, ...chunkLines] : chunkLines;
    fs.writeFileSync(path.join(OUT_DIR, `${num}.sql`), body.join("\n") + "\n", "utf-8");
  });

  console.log(`Wrote ${chunks.length} chunk file(s) to ${OUT_DIR}`);
}

main();
