# PRD: Decoupled Generation, D1-backed Canonical Storage, BYO-Key Personal Questions

## Problem
Today, "generate" and "test" are fused: starting an exam can trigger synchronous LLM calls per theme, making test-taking slow and dependent on the app owner's LLM credits. There is also no real production persistence — `functions/api/db.js` returns a hardcoded array instead of reading a real store, so AI-generated questions vanish between deploys. `questions_db.json` (171KB, curated + accumulated questions) is only usable via `server.js` locally.

## Goals
1. Separate **question generation** (slow, LLM-backed) from **test-taking** (fast, DB-backed) as two distinct screens/flows.
2. Give the app a real, persistent, free-tier-friendly canonical question store.
3. Let any visitor generate their *own* additional questions using their own OpenAI-compatible API key, without touching the shared canonical pool or costing the app owner anything.
4. Let test-taking blend canonical + personal questions.

## Non-goals (v1)
- No accounts/auth system. No server-side identity.
- No cross-device sync of personal questions (email-based sync is a noted v2 path, not built now).
- No attempt history/score tracking (stateless test sessions, as today).

---

## Flow

### Home
- **"Take Test"** — primary CTA. Configures test length/theme mix, pulls questions from canonical D1 pool blended with any personal questions found in the browser's IndexedDB.
- **"Generate your own questions"** — secondary button. Leads to a separate generation screen.

### Generate screen
- User provides: API key, API base URL (OpenAI-compatible only), optionally model name.
- User picks themes/counts to generate.
- Generation runs (still slow/LLM-bound), results are validated/parsed same as today.
- Output is written to the user's **local IndexedDB only** — never sent to or stored in the shared D1 canonical DB.
- Key/base URL are used client-side only for the request (or passed through a thin proxy function that doesn't log/persist them) — not stored server-side.

### Take Test screen
- Reads canonical questions from D1 (via a `functions/api/db.js` query, replacing the current hardcoded array).
- Reads personal questions from IndexedDB (if any exist).
- Blends both pools per the existing theme/count distribution logic — same mixing UX as today's slider, but source is "canonical vs personal" instead of "DB vs fresh-AI-generate."

---

## Storage architecture

### Canonical pool — Cloudflare D1
- Free tier: 5GB storage, 5M row reads/day, 100k row writes/day — comfortably covers this use case.
- Schema (single table, roughly):
  ```sql
  CREATE TABLE questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,            -- 'A' or 'C'
    question TEXT NOT NULL,
    choices TEXT NOT NULL,  -- JSON array
    correctIndex INTEGER NOT NULL,
    explanation TEXT,
    themeId INTEGER,
    theme TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );
  ```
- **Seeding**: `questions_db.json` (committed to repo, becomes the versioned source of truth) is loaded into D1 via a one-time migration/seed script (`wrangler d1 execute` with generated SQL, or a small Node script using the D1 HTTP API). Repo file stays as the human-readable/reviewable source; D1 is the queryable runtime copy.
- `functions/api/db.js` (`onRequestGet`) queries D1 instead of returning a hardcoded array — supports random sampling by theme/type for test assembly.

### Personal pool — Browser IndexedDB
- Per-browser, per-device, unsynced.
- Same question schema as D1, stored as an object store keyed by generated id/timestamp.
- Never transmitted to the server for storage (only transient use during generation).

---

## Open implementation questions to resolve during build
- Exact D1 query shape for "N random questions per theme/type" (D1/SQLite `ORDER BY RANDOM() LIMIT n` per theme, or fetch-all-then-shuffle client-side given dataset size ~171KB/~a few hundred rows).
- Whether the BYO-key generate call goes straight from browser to the user's API base URL (simplest, no proxy needed, but requires that API to allow CORS from the app's origin) or through a thin Pages Function proxy (adds a hop but avoids CORS issues) — **recommend the proxy**, since the current `functions/api/generate.js` pattern already does this and arbitrary third-party CORS support can't be guaranteed.
- Migration script tooling: plain `wrangler d1 execute --file=seed.sql`, generated from `questions_db.json` by a small one-off script.

## Rollout
1. Create D1 database, write schema + seed script, migrate `questions_db.json` in.
2. Update `functions/api/db.js` to query D1.
3. Split UI: Home → Take Test / Generate screens.
4. Add IndexedDB layer for personal questions (generate screen writes, take-test screen reads + blends).
5. Update `functions/api/generate.js` to accept user-supplied key/base URL as request params instead of `env.LLM_API_KEY`/`env.OPENAI_API_BASE` (only for the personal-generation path; keep server-side env vars if you still want an owner-side generation capability for adding to canonical DB directly).
6. Update README to reflect the new architecture and Cloudflare D1 setup steps.
