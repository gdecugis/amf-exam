-- Canonical + personal question store for the AMF mock exam app.
-- owner_email = NULL means canonical (shared); a value means personal to
-- that verified Google email.
-- Apply with: wrangler d1 execute amf-questions --file=d1/schema.sql [--remote]

CREATE TABLE IF NOT EXISTS questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,           -- 'A' or 'C'
  question TEXT NOT NULL,
  choices TEXT NOT NULL,        -- JSON array of 3 strings
  correctIndex INTEGER NOT NULL,
  explanation TEXT,
  themeId INTEGER NOT NULL,
  theme TEXT NOT NULL,
  owner_email TEXT,             -- NULL = canonical, else personal owner
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_questions_theme_type ON questions (themeId, type);
CREATE INDEX IF NOT EXISTS idx_questions_owner ON questions (owner_email);
