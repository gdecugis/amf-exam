# AMF Mock Exam - Standalone Practice App

A standalone web application to practice for the French Financial Markets Authority (AMF - Autorité des Marchés Financiers) certification. The app generates custom mock exams (in French) adhering to the official 12-theme syllabus.

Question generation and test-taking are separate flows:
- **Passer un examen** (take a test) is fast and never calls an LLM — it draws only from stored questions (canonical + your own, if signed in).
- **Générer vos propres questions** (generate your own questions) is slow and LLM-backed — you bring your own OpenAI-compatible API key, sign in with Google, and the results are saved to your account.

## Features

- **Official Syllabus Distribution**: Adheres to the official exam structure (12 official themes, proportional distribution of regulatory Type A and technical Type C questions).
- **Custom Exam Sizes**: Practice with rapid 10-question sessions, or simulate a full-length 120-question official mock exam.
- **Decoupled generation**: Taking a test is instant, reading only from stored questions. Generating new questions is a separate, deliberate action.
- **Canonical + personal question pools**: Tests blend the shared canonical database with any questions you've personally generated, with a slider capped by how many personal questions you actually have.
- **BYO-key generation, synced by account**: Sign in with Google, then generate your own additional questions with your own OpenAI-compatible API key/base URL — no cost to the app owner. Your questions are stored in D1 keyed by your verified email, so they follow you across sessions and devices. The app owner's own account is special-cased: anything they generate while signed in is written straight into the shared canonical pool instead of a personal one.
- **Instant Correction & Feedback**: Instantly reveals the correct answer (in green), your selected answer (in red if incorrect), and the explanation block right after clicking a choice.
- **Zero Complex Build Tools**: Designed as a standalone Single Page App (SPA) compiled directly in the browser.

---

## Project Architecture

- `index.html`: The main page harness loading React, Babel CDN, Lucide Icons, and Google Identity Services.
- `examen-amf.jsx`: The React component containing the app view layouts (home, test setup, generation, exam, results), quiz state, and API fetching logic.
- `auth.js`: Thin wrapper (`window.GoogleAuth`) around Google Identity Services — renders the sign-in button, decodes the returned ID token client-side for display, and persists it in `localStorage` so sign-in survives reloads.
- `server.js`: Lightweight Node.js dev server. Proxies `/api/generate` (forwarding either the server's own `.env` credentials, or a caller-supplied BYO key) and serves `/api/db` from `questions_db.json` locally. Sign-in and personal-question sync require the deployed Cloudflare + D1 environment (no local equivalent of `/api/personal`).
- `questions_db.json`: Versioned, curated source of the canonical question set. This is the file that seeds Cloudflare D1 in production — it is not read directly by the deployed app.
- `functions/api/db.js`: Returns canonical questions from D1 (`owner_email IS NULL`).
- `functions/api/personal.js`: Authenticated (Google ID token) read/write of a signed-in user's own questions. Writes from the app owner's account (`CANONICAL_OWNER_EMAIL`) land with `owner_email = NULL`, i.e. straight into canonical.
- `functions/api/generate.js`: Proxies LLM calls (BYO key or server env) — never writes to D1 itself.
- `functions/_googleAuth.js`: Shared server-side helper that verifies a Google ID token via Google's `tokeninfo` endpoint (checks audience + `email_verified`). Not a route (`_`-prefixed).
- `d1/schema.sql`: Table schema (fresh installs). `d1/migrate-001-owner-email.sql`: adds the `owner_email` column to an already-seeded database. `d1/seed.sql` / `d1/seed-chunks/*.sql`: canonical seed data generated from `questions_db.json`.
- `scripts/generate-d1-seed.js`, `scripts/split-d1-seed.js`: Regenerate the seed file(s) from `questions_db.json`.
- `wrangler.toml`: Cloudflare Pages/D1 project configuration.

---

## Quick Start (Local Development)

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (version 18+) installed.

### 2. Configure Environment Variables
Create a `.env` file at the root of the project (used as the fallback/owner-side credentials — visitors can also supply their own key in the "Générer vos propres questions" screen without needing this):
```env
LLM_API_KEY="your_api_key"
OPENAI_API_BASE="https://inference.baseten.co/v1" # Or any OpenAI-compatible base URL (e.g. Local Ollama, OpenRouter, etc.)
LLM_MODEL="deepseek-ai/DeepSeek-V4-Flash-0731"    # (Optional) Customize the model name
```

### 3. Installation & Run
Install the dependencies and start the local development server:
```bash
# Install packages
npm install

# Start development server
npm run dev
```
Open your browser and navigate to **[http://localhost:3000](http://localhost:3000)**.

In local dev, `/api/db` reads directly from `questions_db.json` and owner-side `/api/generate` calls (no BYO key in the request) get appended back to that file — same as before. Google sign-in and `/api/personal` (synced personal questions) only work in the deployed Cloudflare environment, since they depend on D1 and Pages Functions routing.

---

## Production Deployment (Cloudflare Pages + D1)

### 1. Create the D1 database
```bash
npx wrangler d1 create amf-questions
```
Copy the returned `database_id` into `wrangler.toml` (`database_id = "..."`). (Already done for this project — see `wrangler.toml`.)

### 2. Apply the schema and seed data
```bash
npx wrangler d1 execute amf-questions --file=d1/schema.sql --remote
npx wrangler d1 execute amf-questions --file=d1/seed.sql --remote
```
If your account only has D1 dashboard **Console** access (no file import, no CLI), paste `d1/schema.sql` first, then paste each `d1/seed-chunks/00N.sql` file in order.

If you've edited `questions_db.json`, regenerate seed files first with `node scripts/generate-d1-seed.js` (and `node scripts/split-d1-seed.js` if you need console-sized chunks again).

**Already-seeded database?** Run `d1/migrate-001-owner-email.sql` once (Console or CLI) to add the `owner_email` column used for personal question ownership.

### 3. Deploy the application
```bash
npx wrangler pages deploy . --project-name amf-exam
```
This also gives you a free `amf-exam.pages.dev` URL — no custom domain required.

### 4. Bind D1 to the Pages project
**Settings → Functions → D1 database bindings** → add binding named `DB` → database `amf-questions`.

### 5. Add Environment Variables
In the Cloudflare Dashboard, under **Workers & Pages** → your project → **Settings** → **Environment variables**:
- `LLM_API_KEY`, `OPENAI_API_BASE`, `LLM_MODEL` (optional) — fallback for owner-side generation only; regular visitors' BYO-key generation never needs these.
- `CANONICAL_OWNER_EMAIL` (optional) — the Google account whose generated questions get written straight to canonical. Defaults to `gdecugis@gmail.com` if unset.
- `GOOGLE_CLIENT_ID` (optional) — must match the client ID hardcoded in `auth.js`/`examen-amf.jsx` (`...apps.googleusercontent.com`). Only needed if you rotate the OAuth client; the server falls back to the same default.

### 6. Configure the Google OAuth client
In [Google Cloud Console](https://console.cloud.google.com/apis/credentials), your OAuth 2.0 Client ID (Web application) needs your Pages URL(s) listed under **Authorized JavaScript origins** (e.g. `https://amf-exam.pages.dev` and any preview `*.pages.dev` URLs you use). No redirect URI or client secret is needed — Google Identity Services runs entirely client-side and issues a signed ID token that the server verifies per-request.

### 7. Redeploy
Trigger a redeploy so the D1 binding and env vars take effect.

---

## Disclaimer

**IMPORTANT**: This application is an unofficial study helper designed for practice purposes only.

- **LLM Generated Content**: All questions, answers, and explanations are generated by Large Language Models (LLMs). Artificial intelligence can hallucinate, present outdated information, or make logical errors.
- **No Warranties**: This tool and its questions are provided **"as is"** without any warranties or guarantees of correctness, accuracy, completeness, or compatibility with the actual, official AMF certification exam. 
- **Official Syllabus Alignment**: While the system prompt attempts to target the official AMF exam structure, there is no guarantee that the content generated matches the difficulty, wording, or exact regulatory scope of the official examination. Always cross-reference your answers with official AMF guides, textbooks, and documentation.
- **Liability**: The author makes no representations and assumes no liability for any score outcomes or decisions made based on practicing with this application.
