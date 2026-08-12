const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const THEMES = [
  { id: 1, name: "Cadre institutionnel et réglementaire" },
  { id: 2, name: "Déontologie et conformité" },
  { id: 3, name: "Sécurité financière (LCB-FT, embargos)" },
  { id: 4, name: "Réglementation abus de marché" },
  { id: 5, name: "Commercialisation d'instruments financiers" },
  { id: 6, name: "Relations avec les clients" },
  { id: 7, name: "Instruments financiers et crypto-actifs" },
  { id: 8, name: "Gestion collective / compte de tiers" },
  { id: 9, name: "Fonctionnement et organisation des marchés" },
  { id: 10, name: "Post-marché et infrastructures de marché" },
  { id: 11, name: "Émissions et opérations sur titres" },
  { id: 12, name: "Bases comptables et financières" },
];

// Load env
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let key = match[1];
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    env[key] = value;
  }
});

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === '/api/generate' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body);

        // BYO-key path (personal generation): caller's own key/base URL, used
        // only for this request. Falls back to the local .env for the
        // owner-only path that also persists into questions_db.json below.
        const apiKey = payload.apiKey || env.LLM_API_KEY;
        const apiBase = payload.apiBase || env.OPENAI_API_BASE;
        const model = payload.model || env.LLM_MODEL || 'deepseek-ai/DeepSeek-V4-Flash-0731';
        const isByoKey = Boolean(payload.apiKey);

        if (!apiKey || !apiBase) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Missing API key or base URL' }));
          return;
        }

        const basetenRes = await fetch(`${apiBase}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model,
            messages: payload.messages,
            temperature: payload.temperature || 0.1
          })
        });
        const data = await basetenRes.json();

        // Persist newly generated questions to local questions_db.json file
        // (owner-only path — BYO-key personal questions stay client-side in
        // the browser's IndexedDB and are never written here).
        if (!isByoKey && data.choices && data.choices[0] && data.choices[0].message && typeof data.choices[0].message.content === 'string') {
          try {
            const text = data.choices[0].message.content;
            let clean = text.replace(/```json|```/g, "").trim();
            const firstBrace = clean.indexOf("{");
            const lastBrace = clean.lastIndexOf("}");
            if (firstBrace !== -1 && lastBrace !== -1) {
              clean = clean.slice(firstBrace, lastBrace + 1);
            }
            const parsed = JSON.parse(clean);
            if (parsed && Array.isArray(parsed.questions)) {
              const dbPath = path.join(__dirname, 'questions_db.json');
              let existingQs = [];
              if (fs.existsSync(dbPath)) {
                try {
                  existingQs = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
                  if (!Array.isArray(existingQs)) existingQs = [];
                } catch (e) {
                  existingQs = [];
                }
              }
              
              // Prevent duplicates based on lowercase trimmed question text
              const existingTexts = new Set(existingQs.map(q => q.question.toLowerCase().trim()));
              let addedCount = 0;
              parsed.questions.forEach(q => {
                if (q && q.question && !existingTexts.has(q.question.toLowerCase().trim())) {
                  // Attach the batch details (theme name and themeId) from the client payload if available
                  const themeName = payload.messages && payload.messages[1] ? payload.messages[1].content.match(/Thème : "([^"]+)"/) : null;
                  const matchedThemeName = themeName ? themeName[1] : null;
                  const matchedTheme = matchedThemeName ? THEMES.find(t => t.name === matchedThemeName) : null;
                  
                  existingQs.push({
                    ...q,
                    theme: matchedThemeName || q.theme,
                    themeId: matchedTheme ? matchedTheme.id : q.themeId
                  });
                  addedCount++;
                }
              });
              
              if (addedCount > 0) {
                fs.writeFileSync(dbPath, JSON.stringify(existingQs, null, 2), 'utf-8');
                console.log(`Saved ${addedCount} new question(s) to questions_db.json (total: ${existingQs.length})`);
              }
            }
          } catch (e) {
            console.error("Error saving questions to DB:", e.message);
          }
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  if (req.url === '/api/db' && req.method === 'GET') {
    const dbPath = path.join(__dirname, 'questions_db.json');
    let existingQs = [];
    if (fs.existsSync(dbPath)) {
      try {
        existingQs = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
        if (!Array.isArray(existingQs)) existingQs = [];
      } catch (e) {
        existingQs = [];
      }
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ questions: existingQs }));
    return;
  }

  // Serve static HTML/JS if needed, or index.html
  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fs.readFileSync('index.html', 'utf-8'));
    return;
  }

  // Serve other static files in the directory
  const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    let contentType = 'text/plain';
    if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
      contentType = 'application/javascript';
    } else if (filePath.endsWith('.html')) {
      contentType = 'text/html';
    } else if (filePath.endsWith('.css')) {
      contentType = 'text/css';
    } else if (filePath.endsWith('.svg')) {
      contentType = 'image/svg+xml';
    } else if (filePath.endsWith('.png')) {
      contentType = 'image/png';
    } else if (filePath.endsWith('.webmanifest') || filePath.endsWith('.json')) {
      contentType = 'application/json';
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fs.readFileSync(filePath));
    return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`Standalone local dev server running on http://localhost:${PORT}`);
});
