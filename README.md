# AMF Mock Exam - Standalone Practice App

A standalone web application to practice for the French Financial Markets Authority (AMF - Autorité des Marchés Financiers) certification. The app generates custom mock exams (in French) adhering to the official 12-theme syllabus.

Question generation and test-taking are separate flows:
- **Passer un examen** (take a test) is fast and never calls an LLM — it draws only from a stored question pool.
- **Générer vos propres questions** (generate your own questions) is slow and LLM-backed — you bring your own OpenAI-compatible API key, and the results are saved only in your browser.

## Features

- **Official Syllabus Distribution**: Adheres to the official exam structure (12 official themes, proportional distribution of regulatory Type A and technical Type C questions).
- **Custom Exam Sizes**: Practice with rapid 10-question sessions, or simulate a full-length 120-question official mock exam.
- **Decoupled generation**: Taking a test is instant, reading only from stored questions. Generating new questions is a separate, deliberate action.
- **Canonical + personal question pools**: Tests blend the shared canonical database with any questions you've personally generated, with a slider capped by how many personal questions you actually have.
- **BYO-key generation**: Anyone can generate their own additional questions using their own OpenAI-compatible API key/base URL — no cost to the app owner, and personal questions never get written to the shared canonical database.
- **Instant Correction & Feedback**: Instantly reveals the correct answer (in green), your selected answer (in red if incorrect), and the explanation block right after clicking a choice.
- **Zero Complex Build Tools**: Designed as a standalone Single Page App (SPA) compiled directly in the browser.

---

## Project Architecture

- `index.html`: The main page harness loading React, Babel CDN, and Lucide Icons.
- `examen-amf.jsx`: The React component containing the app view layouts (home, test setup, generation, exam, results), quiz state, and API fetching logic.
- `idb.js`: Browser IndexedDB wrapper (`window.PersonalDB`) storing each user's personally-generated questions locally, per-device.
- `server.js`: Lightweight Node.js dev server. Proxies `/api/generate` (forwarding either the server's own `.env` credentials, or a caller-supplied BYO key) and serves `/api/db` from `questions_db.json` locally.
- `questions_db.json`: Versioned, curated source of the canonical question set. This is the file that seeds Cloudflare D1 in production (see below) — it is not read directly by the deployed app.
- `functions/api/`: Cloudflare Pages Functions for production — `db.js` queries D1 for the canonical pool, `generate.js` proxies LLM calls (BYO key or server env).
- `d1/schema.sql`, `d1/seed.sql`: D1 table schema and a generated seed file (from `questions_db.json`) for the canonical store.
- `scripts/generate-d1-seed.js`: Regenerates `d1/seed.sql` from `questions_db.json`.
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

In local dev, `/api/db` reads directly from `questions_db.json` and owner-side `/api/generate` calls (no BYO key in the request) get appended back to that file — same as before. BYO-key generation calls are proxied but never persisted server-side; they land only in the browser's IndexedDB.

---

## Production Deployment (Cloudflare Pages + D1)

### 1. Create the D1 database
```bash
npx wrangler d1 create amf-questions
```
Copy the returned `database_id` into `wrangler.toml` (`database_id = "..."`).

### 2. Apply the schema and seed data
```bash
npx wrangler d1 execute amf-questions --file=d1/schema.sql --remote
npx wrangler d1 execute amf-questions --file=d1/seed.sql --remote
```
If you've edited `questions_db.json`, regenerate the seed file first with `node scripts/generate-d1-seed.js`.

### 3. Deploy the application
```bash
npx wrangler pages deploy . --project-name amf-exam
```
This also gives you a free `amf-exam.pages.dev` URL — no custom domain required.

### 4. Add Environment Variables (optional — owner-side generation only)
In the Cloudflare Dashboard, under **Workers & Pages** → **amf-exam** → **Settings** → **Environment variables**, add:
- `LLM_API_KEY`
- `OPENAI_API_BASE`
- `LLM_MODEL` (optional)

These are only used as a fallback when a request doesn't supply its own BYO key — regular visitors generating their own questions never need this configured.

### 5. Restrict canonical-DB writes to yourself (optional)
If you later add an owner-only endpoint to write directly into the canonical D1 pool, gate it with **Cloudflare Access** (Zero Trust): create an Access application over that path with a policy allowing only your Google account. This requires no application code — Cloudflare handles the Google OAuth flow at the edge. Free tier covers up to 50 users.

---

## Disclaimer

**IMPORTANT**: This application is an unofficial study helper designed for practice purposes only.

- **LLM Generated Content**: All questions, answers, and explanations are generated by Large Language Models (LLMs). Artificial intelligence can hallucinate, present outdated information, or make logical errors.
- **No Warranties**: This tool and its questions are provided **"as is"** without any warranties or guarantees of correctness, accuracy, completeness, or compatibility with the actual, official AMF certification exam. 
- **Official Syllabus Alignment**: While the system prompt attempts to target the official AMF exam structure, there is no guarantee that the content generated matches the difficulty, wording, or exact regulatory scope of the official examination. Always cross-reference your answers with official AMF guides, textbooks, and documentation.
- **Liability**: The author makes no representations and assumes no liability for any score outcomes or decisions made based on practicing with this application.
