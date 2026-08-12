// import React, { useState, useEffect, useRef, useMemo } from "react";
// import { CheckCircle2, XCircle, Clock, LayoutGrid, ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";

// ---------------------------------------------------------------------------
// Programme officiel : 12 thèmes, répartition réelle 33 questions type A / 87 type C
// ---------------------------------------------------------------------------
const THEMES = [
  { id: 1, name: "Cadre institutionnel et réglementaire", totalA: 6, totalC: 4 },
  { id: 2, name: "Déontologie et conformité", totalA: 6, totalC: 4 },
  { id: 3, name: "Sécurité financière (LCB-FT, embargos)", totalA: 5, totalC: 5 },
  { id: 4, name: "Réglementation abus de marché", totalA: 5, totalC: 5 },
  { id: 5, name: "Commercialisation d'instruments financiers", totalA: 6, totalC: 4 },
  { id: 6, name: "Relations avec les clients", totalA: 5, totalC: 5 },
  { id: 7, name: "Instruments financiers et crypto-actifs", totalA: 0, totalC: 10 },
  { id: 8, name: "Gestion collective / compte de tiers", totalA: 0, totalC: 10 },
  { id: 9, name: "Fonctionnement et organisation des marchés", totalA: 0, totalC: 10 },
  { id: 10, name: "Post-marché et infrastructures de marché", totalA: 0, totalC: 10 },
  { id: 11, name: "Émissions et opérations sur titres", totalA: 0, totalC: 10 },
  { id: 12, name: "Bases comptables et financières", totalA: 0, totalC: 10 },
];

const SYSTEM_PROMPT = `Tu es un générateur de questions pour un examen blanc de la Certification AMF (Autorité des Marchés Financiers), dans des conditions au moins aussi exigeantes que l'examen officiel réel.

RÈGLES DE FORMAT :
- Chaque question a exactement 3 propositions de réponse, une seule correcte.
- Respecte strictement le nombre de questions de type A et de type C demandé pour ce lot.
- Reste concis : question en une phrase, chaque proposition en moins de 15 mots, explication en une phrase courte. La réponse doit rester compacte, sans texte superflu.
- Varie la position de la bonne réponse (correctIndex 0, 1 ou 2) de façon équilibrée d'une question à l'autre — ne mets pas systématiquement la bonne réponse en position 0.

STYLE DES QUESTIONS (calibre la difficulté au moins au niveau de l'examen réel, ne génère jamais de question triviale) :
- Type A : précises et factuelles — définitions réglementaires exactes, obligations légales d'un acteur, rôle d'une autorité, seuils et délais. Registre proche de : "Une société de gestion est tenue à certaines obligations en matière d'information : quelle proposition est exacte ?"
- Type C : culture financière et technique — mécanismes de marché, calculs simples, notions économiques. Registre proche de : "Un ordre à cours limité garantit-il l'exécution ?"
- Les distracteurs doivent être plausibles et proches de la bonne réponse, jamais absurdes. Utilise les pièges classiques : négation inversée, exception à une règle générale, confusion entre deux notions voisines, seuil ou délai légèrement erroné.
- N'invente aucun numéro d'article réglementaire précis — reste sur le fond des règles.

CONTRAINTE CRITIQUE : réponds UNIQUEMENT avec un JSON valide, sans texte avant ni après, sans balises markdown, au format :
{
  "questions": [
    {
      "type": "A ou C",
      "question": "texte de la question",
      "choices": ["proposition 1", "proposition 2", "proposition 3"],
      "correctIndex": 0,
      "explanation": "justification en une phrase courte, 20 mots maximum"
    }
  ]
}`;

// Proportional per-theme A/C distribution for an arbitrary target size,
// scaled off the official 120-question programme in THEMES.
function calculateRequirements(totalTarget) {
  let allocated = 0;
  const reqs = {};
  const remainders = [];

  THEMES.forEach((theme) => {
    const scaleA = (theme.totalA * totalTarget) / 120;
    const scaleC = (theme.totalC * totalTarget) / 120;
    const floorA = Math.floor(scaleA);
    const floorC = Math.floor(scaleC);

    reqs[theme.id] = { A: floorA, C: floorC };
    allocated += floorA + floorC;

    remainders.push({ id: theme.id, type: "A", value: scaleA - floorA });
    remainders.push({ id: theme.id, type: "C", value: scaleC - floorC });
  });

  remainders.sort((a, b) => b.value - a.value);
  let idx = 0;
  while (allocated < totalTarget && idx < remainders.length) {
    const item = remainders[idx];
    reqs[item.id][item.type]++;
    allocated++;
    idx++;
  }

  return reqs;
}

// Turns a { themeId: { A, C } } requirements map into chunked generation batches.
function batchesFromRequirements(requirements) {
  const CHUNK_SIZE = 4;
  const batches = [];
  THEMES.forEach((theme) => {
    const neededA = requirements[theme.id]?.A || 0;
    const neededC = requirements[theme.id]?.C || 0;
    if (neededA === 0 && neededC === 0) return;

    const items = [...Array(neededA).fill("A"), ...Array(neededC).fill("C")];
    const numChunks = Math.ceil(items.length / CHUNK_SIZE);
    const chunks = Array.from({ length: numChunks }, () => []);
    items.forEach((t, i) => chunks[i % numChunks].push(t));
    chunks.forEach((types) => {
      if (types.length > 0) {
        batches.push({
          theme: theme.name,
          themeId: theme.id,
          aCount: types.filter((t) => t === "A").length,
          cCount: types.filter((t) => t === "C").length,
        });
      }
    });
  });
  return batches;
}

async function generateBatch(batch, byo) {
  const userMsg = `Thème : "${batch.theme}".
Génère exactement ${batch.aCount} question(s) de type A et ${batch.cCount} question(s) de type C sur ce thème (total ${batch.aCount + batch.cCount} questions).`;

  const response = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      temperature: 0.1,
      apiKey: byo?.apiKey,
      apiBase: byo?.apiBase,
      model: byo?.model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMsg }
      ],
    }),
  });
  if (!response.ok) {
    const errBody = await response.text().catch(() => "");
    throw new Error(`HTTP ${response.status} ${response.statusText} — ${errBody.slice(0, 300)}`);
  }
  const data = await response.json();
  if (data.error) {
    throw new Error(`API error: ${data.error.message || JSON.stringify(data.error).slice(0, 300)}`);
  }
  const text = data.choices[0].message.content;
  if (!text) {
    throw new Error(`Réponse vide ou inattendue: ${JSON.stringify(data).slice(0, 400)}`);
  }
  let clean = text.replace(/```json|```/g, "").trim();
  const firstBrace = clean.indexOf("{");
  const lastBrace = clean.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1) {
    clean = clean.slice(firstBrace, lastBrace + 1);
  }
  let parsed;
  try {
    parsed = JSON.parse(clean);
  } catch (e) {
    throw new Error(`JSON invalide (${e.message}). Extrait: ${clean.slice(0, 300)}`);
  }
  if (!parsed.questions || !Array.isArray(parsed.questions)) {
    throw new Error(`Champ "questions" manquant. Extrait: ${clean.slice(0, 300)}`);
  }
  return parsed.questions.map((q) => shuffleChoices({ ...q, theme: batch.theme, themeId: batch.themeId }));
}

// Mélange l'ordre des 3 propositions pour éviter tout biais de position de la bonne réponse
// (le modèle a tendance à imiter l'exemple du schéma, où la bonne réponse est en position 0)
function shuffleChoices(q) {
  const order = [0, 1, 2];
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const choices = order.map((idx) => q.choices[idx]);
  const correctIndex = order.indexOf(q.correctIndex);
  return { ...q, choices, correctIndex };
}

async function generateBatchWithRetry(batch, byo, attempts = 2) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      return await generateBatch(batch, byo);
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

function formatTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// ---------------------------------------------------------------------------
// Styles — classes CSS explicites (pas de couleurs Tailwind arbitraires)
// ---------------------------------------------------------------------------
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

      .amf-app { background:#EDEFEF; min-height:100vh; font-family:'IBM Plex Sans', sans-serif; box-sizing:border-box; }
      .amf-app * { box-sizing:border-box; }
      .amf-serif { font-family:'Fraunces', serif; }
      .amf-mono { font-family:'IBM Plex Mono', monospace; }
      .amf-card { background:#FFFFFF; border:1px solid #D8DAD7; border-radius:3px; }
      .amf-hr { border-top:1px solid #D8DAD7; }

      .amf-ink { color:#16233F; }
      .amf-accent { color:#9C7A3C; }
      .amf-muted { color:#8A8F94; }
      .amf-secondary { color:#6B7075; }
      .amf-body { color:#3A3F45; }
      .amf-success { color:#3E7A5B; }
      .amf-fail { color:#A83232; }
      .amf-warn { color:#E08A8A; }
      .amf-headersub { color:#B9C2D0; }

      .amf-btn-primary { background:#16233F; color:#FFFFFF; border:none; cursor:pointer; }
      .amf-btn-primary:hover { background:#243559; }
      .amf-btn-accent { background:#9C7A3C; color:#FFFFFF; border:none; cursor:pointer; }
      .amf-btn-accent:hover { background:#87692F; }
      .amf-btn-outline { background:#FFFFFF; color:#3A3F45; border:1px solid #D8DAD7; cursor:pointer; }
      .amf-btn-outline:hover { border-color:#9C7A3C; }
      .amf-icon-btn { background:transparent; border:1px solid #D8DAD7; cursor:pointer; color:#16233F; }
      .amf-icon-btn:disabled { opacity:0.3; cursor:default; }
      .amf-icon-btn-dark { background:transparent; border:none; cursor:pointer; color:#FFFFFF; }
      .amf-icon-btn-dark:hover { background:rgba(255,255,255,0.12); }

      .amf-seal { border-width:3px; border-style:double; border-radius:9999px; display:flex; align-items:center; justify-content:center; transform:rotate(-6deg); flex-shrink:0; }
      .amf-seal-ink { border-color:#16233F; color:#16233F; }
      .amf-seal-success { border-color:#3E7A5B; color:#3E7A5B; }
      .amf-seal-fail { border-color:#A83232; color:#A83232; }

      .amf-badge { border:1px solid #9C7A3C; color:#9C7A3C; }

      .amf-track { background:#EDEFEF; }
      .amf-track-light { background:#D8DAD7; }
      .amf-fill-accent { background:#9C7A3C; }
      .amf-fill-success { background:#3E7A5B; }
      .amf-fill-fail { background:#A83232; }

      .amf-header { background:#16233F; color:#FFFFFF; }

      .amf-choice { display:block; width:100%; text-align:left; border:1px solid #D8DAD7; color:#3A3F45; background:#FFFFFF; cursor:pointer; }
      .amf-choice:hover { border-color:#9C7A3C; }
      .amf-choice.selected { border-color:#16233F; background:#16233F; color:#FFFFFF; }

      .amf-dot { border:1px solid #D8DAD7; color:#8A8F94; background:#FFFFFF; cursor:pointer; }
      .amf-dot.answered { background:#16233F; border-color:#16233F; color:#FFFFFF; }
      .amf-dot.current { border-color:#9C7A3C; box-shadow:0 0 0 2px #9C7A3C; color:#16233F; }

      .amf-overlay { background:rgba(0,0,0,0.45); }

      .amf-choice-correct { border:1px solid #3E7A5B; background:rgba(62,122,91,0.08); color:#2E5D45; }
      .amf-choice-wrong { border:1px solid #A83232; background:rgba(168,50,50,0.08); color:#8A2828; }
      .amf-choice-neutral { border:1px solid #EDEFEF; color:#8A8F94; }

      .amf-filter-active { background:#16233F; color:#FFFFFF; border:1px solid #16233F; cursor:pointer; }
      .amf-filter-inactive { background:#FFFFFF; color:#6B7075; border:1px solid #D8DAD7; cursor:pointer; }
    `}</style>
  );
}

function Seal({ label, tone = "ink" }) {
  const toneClass = tone === "success" ? "amf-seal-success" : tone === "fail" ? "amf-seal-fail" : "amf-seal-ink";
  return (
    <div className={`amf-seal ${toneClass}`} style={{ width: "7rem", height: "7rem" }}>
      <span className="amf-serif" style={{ fontSize: "10px", letterSpacing: "0.15em", textAlign: "center", lineHeight: 1.3, textTransform: "uppercase", padding: "0 8px" }}>
        {label}
      </span>
    </div>
  );
}

const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

function AMFExam() {
  const [screen, setScreen] = useState("home");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0, label: "" });
  const [genError, setGenError] = useState(null);
  const [remaining, setRemaining] = useState(7200);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const timerRef = useRef(null);

  // Canonical pool (Cloudflare D1, via /api/db) and personal pool (IndexedDB)
  const [canonicalCount, setCanonicalCount] = useState(0);
  const [personalCount, setPersonalCount] = useState(0);
  const [examSize, setExamSize] = useState(120);
  const [personalMixCount, setPersonalMixCount] = useState(0);

  // BYO-key generation form state
  const [byoApiKey, setByoApiKey] = useState("");
  const [byoApiBase, setByoApiBase] = useState("");
  const [byoModel, setByoModel] = useState("");
  const [generateSize, setGenerateSize] = useState(30);

  const personalMax = Math.min(examSize, personalCount);

  // Keep the personal-mix slider within bounds as examSize/personalCount change
  useEffect(() => {
    setPersonalMixCount((prev) => Math.min(prev, personalMax));
  }, [personalMax]);

  useEffect(() => {
    if (screen === "exam") {
      timerRef.current = setInterval(() => {
        setRemaining((r) => (r > 0 ? r - 1 : 0));
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [screen]);

  useEffect(() => {
    if (screen !== "test-setup") return;
    fetch("/api/db")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.questions)) {
          setCanonicalCount(data.questions.length);
        }
      })
      .catch((err) => console.error("Could not fetch canonical DB info", err));
    window.PersonalDB.count()
      .then(setPersonalCount)
      .catch((err) => console.error("Could not read personal question store", err));
  }, [screen]);

  // Assemble a test purely from stored questions (canonical D1 + personal
  // IndexedDB) — no LLM calls happen on this path.
  const startTest = async () => {
    setGenError(null);

    let canonicalQuestions = [];
    let personalQuestions = [];
    try {
      const res = await fetch("/api/db");
      const data = await res.json();
      canonicalQuestions = data.questions || [];
    } catch (e) {
      console.warn("Could not load canonical database", e);
    }
    try {
      personalQuestions = await window.PersonalDB.getAll();
    } catch (e) {
      console.warn("Could not load personal question store", e);
    }

    const mapByThemeType = (list) => {
      const map = {};
      THEMES.forEach((t) => { map[t.id] = { A: [], C: [] }; });
      list.forEach((q) => {
        let matchedTheme = THEMES.find((t) => t.id === q.themeId);
        if (!matchedTheme && q.theme) {
          matchedTheme = THEMES.find((t) => t.name.toLowerCase().trim() === q.theme.toLowerCase().trim());
        }
        if (matchedTheme && (q.type === "A" || q.type === "C")) {
          map[matchedTheme.id][q.type].push({ ...q, themeId: matchedTheme.id });
        }
      });
      return map;
    };

    const requirements = calculateRequirements(examSize);
    const chosen = [];

    const fillFrom = (map, budget) => {
      let filled = 0;
      if (budget <= 0) return filled;
      const pool = [];
      THEMES.forEach((theme) => {
        ["A", "C"].forEach((type) => {
          map[theme.id][type].forEach((q) => pool.push({ themeId: theme.id, type, questionObj: q }));
        });
      });
      shuffleArray(pool);
      for (const item of pool) {
        if (filled >= budget) break;
        const req = requirements[item.themeId];
        if (req[item.type] > 0) {
          req[item.type]--;
          chosen.push({ ...item.questionObj, theme: THEMES.find((t) => t.id === item.themeId).name, themeId: item.themeId });
          filled++;
        }
      }
      return filled;
    };

    // Personal questions first, bounded by the slider; canonical fills the rest.
    fillFrom(mapByThemeType(personalQuestions), personalMixCount);
    fillFrom(mapByThemeType(canonicalQuestions), examSize - chosen.length);

    if (chosen.length < examSize) {
      setGenError(`Seulement ${chosen.length}/${examSize} questions disponibles pour cette configuration (BDD canonique + personnelle insuffisantes).`);
    }

    shuffleArray(chosen);
    chosen.forEach((q, idx) => { q.id = idx + 1; });
    setQuestions(chosen);
    setAnswers({});
    setCurrent(0);
    setRemaining(7200);
    setScreen("exam");
  };

  // BYO-key generation — writes results to the browser's personal IndexedDB
  // pool only. Never touches the canonical D1 store.
  const startPersonalGeneration = async () => {
    if (!byoApiKey.trim() || !byoApiBase.trim()) {
      setGenError("Merci de renseigner votre clé API et l'URL de base.");
      return;
    }
    setGenError(null);
    setScreen("generating-personal");

    const requirements = calculateRequirements(generateSize);
    const batches = batchesFromRequirements(requirements);
    const byo = { apiKey: byoApiKey.trim(), apiBase: byoApiBase.trim(), model: byoModel.trim() || undefined };

    setProgress({ done: 0, total: batches.length, label: "Initialisation" });
    const generated = [];

    try {
      for (let i = 0; i < batches.length; i++) {
        setProgress({ done: i, total: batches.length, label: batches[i].theme });
        const qs = await generateBatchWithRetry(batches[i], byo);
        generated.push(...qs);
      }
      setProgress({ done: batches.length, total: batches.length, label: "Terminé" });
      await window.PersonalDB.addMany(generated);
      setScreen("generate-done");
    } catch (e) {
      setGenError(`Échec de la génération — ${e.message || e}`);
      setScreen("generate-setup");
    }
  };

  const selectAnswer = (qId, idx) => {
    setAnswers((prev) => ({ ...prev, [qId]: idx }));
  };

  const answeredCount = Object.keys(answers).length;
  const q = questions[current];

  const results = useMemo(() => {
    if (screen !== "results") return null;
    const scored = questions.map((qq) => ({
      ...qq,
      userAnswer: answers[qq.id],
      isCorrect: answers[qq.id] === qq.correctIndex,
    }));
    const aQs = scored.filter((x) => x.type === "A");
    const cQs = scored.filter((x) => x.type === "C");
    const aCorrect = aQs.filter((x) => x.isCorrect).length;
    const cCorrect = cQs.filter((x) => x.isCorrect).length;
    const aPct = aQs.length ? (aCorrect / aQs.length) * 100 : 0;
    const cPct = cQs.length ? (cCorrect / cQs.length) * 100 : 0;
    const passed = aPct >= 80 && cPct >= 80;
    const byTheme = THEMES.map((t) => {
      const items = scored.filter((x) => x.themeId === t.id);
      const correct = items.filter((x) => x.isCorrect).length;
      return { ...t, correct, total: items.length };
    });
    return { scored, aQs, cQs, aCorrect, cCorrect, aPct, cPct, passed, byTheme };
  }, [screen, questions, answers]);

  // ---------------------------------------------------------------- HOME
  if (screen === "home") {
    return (
      <div className="amf-app" style={{ padding: "24px" }}>
        <GlobalStyles />
        <div className="amf-card" style={{ maxWidth: "480px", margin: "24px auto", padding: "32px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px", gap: "16px" }}>
            <div>
              <p className="amf-accent" style={{ fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "4px" }}>Examen blanc</p>
              <h1 className="amf-serif amf-ink" style={{ fontSize: "26px", lineHeight: 1.2, margin: 0 }}>Certification AMF</h1>
            </div>
            <Seal label="Spécimen d'examen" tone="ink" />
          </div>
          <button onClick={() => setScreen("test-setup")} className="amf-btn-primary" style={{ width: "100%", padding: "14px", borderRadius: "3px", fontSize: "14px", letterSpacing: "0.02em", marginBottom: "12px" }}>
            Passer un examen
          </button>
          <button onClick={() => { setGenError(null); setScreen("generate-setup"); }} className="amf-btn-outline" style={{ width: "100%", padding: "12px", borderRadius: "3px", fontSize: "13px" }}>
            Générer vos propres questions
          </button>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------- TEST SETUP
  if (screen === "test-setup") {
    return (
      <div className="amf-app" style={{ padding: "24px" }}>
        <GlobalStyles />
        <div className="amf-card" style={{ maxWidth: "480px", margin: "24px auto", padding: "32px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px", gap: "16px" }}>
            <div>
              <p className="amf-accent" style={{ fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "4px" }}>Examen blanc</p>
              <h1 className="amf-serif amf-ink" style={{ fontSize: "26px", lineHeight: 1.2, margin: 0 }}>Certification AMF</h1>
            </div>
            <Seal label="Spécimen d'examen" tone="ink" />
          </div>
          <div className="amf-hr" style={{ paddingTop: "16px", marginBottom: "24px", display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px" }}>
            <Row label="Format" value={`${examSize} questions à choix multiple, 3 propositions`} />
            <Row label="Seuil de réussite" value="80% sur le bloc A et 80% sur le bloc C, sans compensation" />
            <Row label="Durée" value="2 heures (chronomètre indicatif)" />
            <Row label="Base canonique" value={`${canonicalCount} question(s)`} />
            <Row label="Vos questions personnelles" value={`${personalCount} question(s)`} />
          </div>

          <div style={{ marginBottom: "20px", padding: "16px", background: "#F5F6F6", borderRadius: "3px", border: "1px solid #D8DAD7" }}>
            <label className="amf-ink" style={{ fontSize: "13px", fontWeight: "600", display: "block", marginBottom: "8px" }}>
              Taille de l'examen :
            </label>
            <select
              value={examSize}
              onChange={(e) => setExamSize(Number(e.target.value))}
              style={{ width: "100%", padding: "8px", borderRadius: "3px", border: "1px solid #D8DAD7", background: "#FFFFFF", cursor: "pointer", fontSize: "13px" }}
            >
              <option value="10">10 questions (Entraînement rapide)</option>
              <option value="30">30 questions (Mini-examen)</option>
              <option value="60">60 questions (Demi-examen)</option>
              <option value="90">90 questions (Examen intermédiaire)</option>
              <option value="120">120 questions (Examen officiel complet)</option>
            </select>
          </div>

          {personalCount > 0 && (
            <div style={{ marginBottom: "24px", padding: "16px", background: "#F5F6F6", borderRadius: "3px", border: "1px solid #D8DAD7" }}>
              <label className="amf-ink" style={{ fontSize: "13px", fontWeight: "600", display: "block", marginBottom: "8px" }}>
                Mélange canonique / personnel :
              </label>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "13px", marginBottom: "8px" }}>
                <span className="amf-secondary">Vos questions : <strong>{personalMixCount}</strong></span>
                <span className="amf-secondary">Base canonique : <strong>{examSize - personalMixCount}</strong></span>
              </div>
              <input
                type="range"
                min={0}
                max={personalMax}
                value={personalMixCount}
                onChange={(e) => setPersonalMixCount(Number(e.target.value))}
                style={{ width: "100%", cursor: "pointer", accentColor: "#9C7A3C" }}
              />
              <p className="amf-muted" style={{ fontSize: "11px", marginTop: "8px", fontStyle: "italic" }}>
                Limité à {personalMax} question(s), selon le nombre de questions personnelles disponibles pour cette taille d'examen.
              </p>
            </div>
          )}

          {genError && <p className="amf-fail" style={{ fontSize: "13px", marginBottom: "16px", wordBreak: "break-word" }}>{genError}</p>}
          <button onClick={startTest} className="amf-btn-primary" style={{ width: "100%", padding: "12px", borderRadius: "3px", fontSize: "14px", letterSpacing: "0.02em" }}>
            Lancer l'examen ({examSize} questions)
          </button>
          <button onClick={() => setScreen("home")} className="amf-btn-outline" style={{ width: "100%", padding: "10px", borderRadius: "3px", fontSize: "13px", marginTop: "12px" }}>
            Retour
          </button>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------- GENERATE SETUP
  if (screen === "generate-setup" || screen === "generate-done") {
    return (
      <div className="amf-app" style={{ padding: "24px" }}>
        <GlobalStyles />
        <div className="amf-card" style={{ maxWidth: "480px", margin: "24px auto", padding: "32px" }}>
          <p className="amf-accent" style={{ fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "4px" }}>Génération personnelle</p>
          <h1 className="amf-serif amf-ink" style={{ fontSize: "22px", lineHeight: 1.2, marginTop: 0, marginBottom: "16px" }}>Générer vos propres questions</h1>
          <p className="amf-secondary" style={{ fontSize: "13px", marginBottom: "20px" }}>
            Utilisez votre propre clé API (compatible OpenAI). Les questions générées sont enregistrées uniquement dans votre navigateur et ne sont jamais envoyées à la base canonique.
          </p>

          {screen === "generate-done" ? (
            <div style={{ marginBottom: "20px", padding: "16px", background: "#F5F6F6", borderRadius: "3px", border: "1px solid #D8DAD7" }}>
              <p className="amf-success" style={{ fontSize: "13px", margin: 0 }}>Questions générées et enregistrées localement.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
              <label style={{ fontSize: "13px" }}>
                <span className="amf-ink" style={{ fontWeight: "600", display: "block", marginBottom: "4px" }}>Clé API</span>
                <input type="password" value={byoApiKey} onChange={(e) => setByoApiKey(e.target.value)} placeholder="sk-..." style={{ width: "100%", padding: "8px", borderRadius: "3px", border: "1px solid #D8DAD7", fontSize: "13px" }} />
              </label>
              <label style={{ fontSize: "13px" }}>
                <span className="amf-ink" style={{ fontWeight: "600", display: "block", marginBottom: "4px" }}>URL de base (compatible OpenAI)</span>
                <input type="text" value={byoApiBase} onChange={(e) => setByoApiBase(e.target.value)} placeholder="https://api.openai.com/v1" style={{ width: "100%", padding: "8px", borderRadius: "3px", border: "1px solid #D8DAD7", fontSize: "13px" }} />
              </label>
              <label style={{ fontSize: "13px" }}>
                <span className="amf-ink" style={{ fontWeight: "600", display: "block", marginBottom: "4px" }}>Modèle (optionnel)</span>
                <input type="text" value={byoModel} onChange={(e) => setByoModel(e.target.value)} placeholder="gpt-4o-mini" style={{ width: "100%", padding: "8px", borderRadius: "3px", border: "1px solid #D8DAD7", fontSize: "13px" }} />
              </label>
              <label style={{ fontSize: "13px" }}>
                <span className="amf-ink" style={{ fontWeight: "600", display: "block", marginBottom: "4px" }}>Nombre de questions à générer</span>
                <select value={generateSize} onChange={(e) => setGenerateSize(Number(e.target.value))} style={{ width: "100%", padding: "8px", borderRadius: "3px", border: "1px solid #D8DAD7", fontSize: "13px" }}>
                  <option value="10">10 questions</option>
                  <option value="30">30 questions</option>
                  <option value="60">60 questions</option>
                  <option value="120">120 questions</option>
                </select>
              </label>
            </div>
          )}

          {genError && <p className="amf-fail" style={{ fontSize: "13px", marginBottom: "16px", wordBreak: "break-word" }}>{genError}</p>}

          {screen === "generate-done" ? (
            <button onClick={() => setScreen("home")} className="amf-btn-primary" style={{ width: "100%", padding: "12px", borderRadius: "3px", fontSize: "14px" }}>
              Retour à l'accueil
            </button>
          ) : (
            <button onClick={startPersonalGeneration} className="amf-btn-primary" style={{ width: "100%", padding: "12px", borderRadius: "3px", fontSize: "14px" }}>
              Générer {generateSize} question(s)
            </button>
          )}
          <button onClick={() => setScreen("home")} className="amf-btn-outline" style={{ width: "100%", padding: "10px", borderRadius: "3px", fontSize: "13px", marginTop: "12px" }}>
            Retour
          </button>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------- GENERATING (personal)
  if (screen === "generating-personal") {
    const pct = progress.total ? Math.round((progress.done / progress.total) * 100) : 0;
    return (
      <div className="amf-app" style={{ padding: "24px" }}>
        <GlobalStyles />
        <div className="amf-card" style={{ maxWidth: "480px", margin: "24px auto", padding: "32px", textAlign: "center" }}>
          <Loader2 className="amf-ink" style={{ width: "32px", height: "32px", margin: "0 auto 16px", animation: "spin 1s linear infinite" }} />
          <style>{`@keyframes spin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }`}</style>
          <h2 className="amf-serif amf-ink" style={{ fontSize: "18px", marginBottom: "8px" }}>Génération de vos questions</h2>
          <p className="amf-secondary" style={{ fontSize: "14px", marginBottom: "24px" }}>{progress.label || "Préparation…"}</p>
          <div className="amf-track" style={{ width: "100%", height: "6px", borderRadius: "999px", overflow: "hidden", marginBottom: "8px" }}>
            <div className="amf-fill-accent" style={{ height: "100%", width: `${pct}%`, transition: "width 0.3s" }} />
          </div>
          <p className="amf-mono amf-muted" style={{ fontSize: "12px" }}>{progress.done}/{progress.total} lots générés</p>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------- EXAM
  if (screen === "exam" && q) {
    return (
      <div className="amf-app">
        <GlobalStyles />
        <div className="amf-header" style={{ position: "sticky", top: 0, zIndex: 20, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p className="amf-headersub" style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>Examen blanc AMF</p>
            <p className="amf-mono" style={{ fontSize: "14px", margin: 0 }}>Question {current + 1} / {questions.length}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div className={`amf-mono ${remaining < 600 ? "amf-warn" : "amf-headersub"}`} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px" }}>
              <Clock style={{ width: "16px", height: "16px" }} />
              {formatTime(remaining)}
            </div>
            <button onClick={() => setNavOpen(true)} className="amf-icon-btn-dark" style={{ padding: "6px", borderRadius: "3px" }}>
              <LayoutGrid style={{ width: "16px", height: "16px" }} />
            </button>
          </div>
        </div>
        <div className="amf-track-light" style={{ height: "4px" }}>
          <div className="amf-fill-accent" style={{ height: "100%", width: `${((current + 1) / questions.length) * 100}%` }} />
        </div>

        <div style={{ maxWidth: "640px", margin: "0 auto", padding: "20px", paddingBottom: "128px" }}>
          <div className="amf-card" style={{ padding: "24px", marginTop: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <span className="amf-badge amf-mono" style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "3px" }}>Type {q.type}</span>
              <span className="amf-muted" style={{ fontSize: "11px" }}>{q.theme}</span>
            </div>
            <p className="amf-ink" style={{ fontSize: "16px", lineHeight: 1.6, marginBottom: "20px" }}>{q.question}</p>
             <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {q.choices.map((choice, idx) => {
                const userSelected = answers[q.id] === idx;
                const hasAnswered = answers[q.id] !== undefined;
                const isCorrect = idx === q.correctIndex;
                
                let cls = "";
                if (hasAnswered) {
                  if (isCorrect) {
                    cls = "amf-choice-correct";
                  } else if (userSelected) {
                    cls = "amf-choice-wrong";
                  } else {
                    cls = "amf-choice-neutral";
                  }
                } else if (userSelected) {
                  cls = "selected";
                }

                return (
                  <button 
                    key={idx} 
                    onClick={() => !hasAnswered && selectAnswer(q.id, idx)} 
                    className={`amf-choice ${cls}`} 
                    style={{ padding: "12px 16px", borderRadius: "3px", fontSize: "14px", cursor: hasAnswered ? "default" : "pointer" }}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>

            {answers[q.id] !== undefined && (
              <div className="amf-hr" style={{ marginTop: "16px", paddingTop: "16px" }}>
                <p className="amf-secondary" style={{ fontSize: "13px", fontStyle: "italic", marginBottom: "16px" }}>
                  <strong>Explication :</strong> {q.explanation}
                </p>
                {current < questions.length - 1 && (
                  <button 
                    onClick={() => setCurrent((c) => c + 1)} 
                    className="amf-btn-primary" 
                    style={{ padding: "8px 16px", borderRadius: "3px", fontSize: "13px" }}
                  >
                    Question suivante
                  </button>
                )}
              </div>
            )}
          </div>
          <p className="amf-mono amf-muted" style={{ fontSize: "12px", textAlign: "center", marginTop: "12px" }}>
            {answeredCount} / {questions.length} répondues
          </p>
        </div>

        <div className="amf-card" style={{ position: "fixed", bottom: 0, left: 0, right: 0, borderRadius: 0, padding: "12px 16px", display: "flex", alignItems: "center", gap: "8px" }}>
          <button onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0} className="amf-icon-btn" style={{ padding: "10px", borderRadius: "3px" }}>
            <ChevronLeft style={{ width: "16px", height: "16px" }} />
          </button>
          <button onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))} disabled={current === questions.length - 1} className="amf-icon-btn" style={{ padding: "10px", borderRadius: "3px" }}>
            <ChevronRight style={{ width: "16px", height: "16px" }} />
          </button>
          <button onClick={() => setConfirmSubmit(true)} className="amf-btn-accent" style={{ flex: 1, padding: "10px", borderRadius: "3px", fontSize: "14px" }}>
            Terminer l'examen
          </button>
        </div>

        {navOpen && (
          <div className="amf-overlay" style={{ position: "fixed", inset: 0, zIndex: 30, display: "flex", alignItems: "flex-end" }} onClick={() => setNavOpen(false)}>
            <div style={{ background: "#FFFFFF", width: "100%", maxHeight: "70vh", overflowY: "auto", borderRadius: "6px 6px 0 0", padding: "20px" }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <h3 className="amf-serif amf-ink" style={{ margin: 0 }}>Plan de l'examen</h3>
                <button onClick={() => setNavOpen(false)} className="amf-muted" style={{ background: "none", border: "none", cursor: "pointer" }}><X style={{ width: "20px", height: "20px" }} /></button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: "8px" }}>
                {questions.map((qq, idx) => {
                  const answered = answers[qq.id] !== undefined;
                  const isCurrent = idx === current;
                  return (
                    <button key={qq.id} onClick={() => { setCurrent(idx); setNavOpen(false); }} className={`amf-dot amf-mono ${answered ? "answered" : ""} ${isCurrent ? "current" : ""}`} style={{ aspectRatio: "1", borderRadius: "3px", fontSize: "11px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {confirmSubmit && (
          <div className="amf-overlay" style={{ position: "fixed", inset: 0, zIndex: 40, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
            <div style={{ background: "#FFFFFF", borderRadius: "6px", padding: "24px", maxWidth: "384px", width: "100%" }}>
              <h3 className="amf-serif amf-ink" style={{ fontSize: "18px", marginBottom: "8px" }}>Terminer l'examen ?</h3>
              <p className="amf-secondary" style={{ fontSize: "14px", marginBottom: "4px" }}>
                {answeredCount} question(s) répondue(s) sur {questions.length}.
              </p>
              {answeredCount < questions.length && (
                <p className="amf-fail" style={{ fontSize: "14px", marginBottom: "16px" }}>
                  {questions.length - answeredCount} question(s) sans réponse seront comptées comme incorrectes.
                </p>
              )}
              <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                <button onClick={() => setConfirmSubmit(false)} className="amf-btn-outline" style={{ flex: 1, padding: "10px", borderRadius: "3px", fontSize: "14px" }}>
                  Continuer l'examen
                </button>
                <button onClick={() => { setConfirmSubmit(false); setScreen("results"); }} className="amf-btn-primary" style={{ flex: 1, padding: "10px", borderRadius: "3px", fontSize: "14px" }}>
                  Soumettre
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ---------------------------------------------------------------- RESULTS
  if (screen === "results" && results) {
    return <ResultsScreen results={results} onHome={() => setScreen("home")} />;
  }

  return null;
}

function Row({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
      <span className="amf-muted" style={{ flexShrink: 0 }}>{label}</span>
      <span className="amf-body" style={{ textAlign: "right" }}>{value}</span>
    </div>
  );
}

function ResultsScreen({ results, onHome }) {
  const { scored, aCorrect, cCorrect, aQs, cQs, aPct, cPct, passed, byTheme } = results;
  const [filter, setFilter] = useState("errors");
  const shown = filter === "errors" ? scored.filter((s) => !s.isCorrect) : scored;

  return (
    <div className="amf-app" style={{ padding: "20px" }}>
      <GlobalStyles />
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        <div className="amf-card" style={{ padding: "24px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "20px" }}>
          <Seal label={passed ? "Certification obtenue" : "Non obtenue"} tone={passed ? "success" : "fail"} />
          <div>
            <p className="amf-muted" style={{ fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "4px" }}>Résultat</p>
            <h1 className={`amf-serif ${passed ? "amf-success" : "amf-fail"}`} style={{ fontSize: "26px", margin: 0 }}>
              {passed ? "Admis" : "Ajourné"}
            </h1>
            <p className="amf-secondary" style={{ fontSize: "14px", marginTop: "4px" }}>Seuil requis : 80% sur chaque bloc, sans compensation.</p>
          </div>
        </div>

        <button onClick={onHome} className="amf-btn-primary" style={{ width: "100%", padding: "12px", borderRadius: "3px", fontSize: "14px", marginBottom: "16px" }}>
          Retour à l'accueil
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
          <ScoreCard label="Bloc A — Réglementaire" correct={aCorrect} total={aQs.length} pct={aPct} />
          <ScoreCard label="Bloc C — Technique" correct={cCorrect} total={cQs.length} pct={cPct} />
        </div>

        <div className="amf-card" style={{ padding: "20px", marginBottom: "16px" }}>
          <h3 className="amf-serif amf-ink" style={{ fontSize: "14px", marginBottom: "12px" }}>Détail par thème</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {byTheme.map((t) => {
              const pct = t.total ? Math.round((t.correct / t.total) * 100) : 0;
              return (
                <div key={t.id} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "13px" }}>
                  <span className="amf-body" style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.id}. {t.name}</span>
                  <span className="amf-mono amf-muted" style={{ fontSize: "12px", width: "48px", textAlign: "right" }}>{t.correct}/{t.total}</span>
                  <div className="amf-track" style={{ width: "64px", height: "6px", borderRadius: "999px", overflow: "hidden" }}>
                    <div className={pct >= 80 ? "amf-fill-success" : "amf-fill-fail"} style={{ height: "100%", width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="amf-card" style={{ padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <h3 className="amf-serif amf-ink" style={{ fontSize: "14px", margin: 0 }}>Correction détaillée</h3>
            <div style={{ display: "flex", gap: "4px", fontSize: "12px" }}>
              <button onClick={() => setFilter("errors")} className={filter === "errors" ? "amf-filter-active" : "amf-filter-inactive"} style={{ padding: "4px 12px", borderRadius: "3px" }}>Erreurs</button>
              <button onClick={() => setFilter("all")} className={filter === "all" ? "amf-filter-active" : "amf-filter-inactive"} style={{ padding: "4px 12px", borderRadius: "3px" }}>Toutes</button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {shown.length === 0 && <p className="amf-secondary" style={{ fontSize: "14px", textAlign: "center", padding: "24px 0" }}>Aucune erreur sur cette sélection.</p>}
            {shown.map((s) => (
              <div key={s.id} className="amf-hr" style={{ paddingBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  {s.isCorrect ? <CheckCircle2 className="amf-success" style={{ width: "16px", height: "16px", flexShrink: 0 }} /> : <XCircle className="amf-fail" style={{ width: "16px", height: "16px", flexShrink: 0 }} />}
                  <span className="amf-badge amf-mono" style={{ fontSize: "10px", padding: "1px 6px", borderRadius: "3px" }}>Type {s.type}</span>
                  <span className="amf-muted" style={{ fontSize: "11px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.theme}</span>
                </div>
                <p className="amf-ink" style={{ fontSize: "14px", marginBottom: "8px" }}>{s.question}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "8px" }}>
                  {s.choices.map((c, idx) => {
                    const isCorrectChoice = idx === s.correctIndex;
                    const isUserChoice = idx === s.userAnswer;
                    const cls = isCorrectChoice ? "amf-choice-correct" : isUserChoice ? "amf-choice-wrong" : "amf-choice-neutral";
                    return (
                      <div key={idx} className={cls} style={{ fontSize: "12px", padding: "6px 10px", borderRadius: "3px" }}>
                        {c}
                        {isUserChoice && !isCorrectChoice && <span style={{ marginLeft: "8px", fontSize: "10px" }}>(votre réponse)</span>}
                      </div>
                    );
                  })}
                </div>
                <p className="amf-secondary" style={{ fontSize: "12px", fontStyle: "italic" }}>{s.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreCard({ label, correct, total, pct }) {
  const ok = pct >= 80;
  return (
    <div className="amf-card" style={{ padding: "16px" }}>
      <p className="amf-muted" style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>{label}</p>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", marginBottom: "8px" }}>
        <span className={`amf-serif ${ok ? "amf-success" : "amf-fail"}`} style={{ fontSize: "24px" }}>{Math.round(pct)}%</span>
        <span className="amf-mono amf-muted" style={{ fontSize: "12px", marginBottom: "4px" }}>{correct}/{total}</span>
      </div>
      <div className="amf-track" style={{ width: "100%", height: "6px", borderRadius: "999px", overflow: "hidden" }}>
        <div className={ok ? "amf-fill-success" : "amf-fill-fail"} style={{ height: "100%", width: `${Math.min(pct, 100)}%` }} />
      </div>
      <p className="amf-muted" style={{ fontSize: "10px", marginTop: "4px" }}>Seuil requis : 80%</p>
    </div>
  );
}
