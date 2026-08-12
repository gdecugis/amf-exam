-- Adds per-user ownership to the existing questions table.
-- Canonical rows keep owner_email = NULL; personal rows get the
-- generating user's verified Google email.
-- Apply once, in the D1 dashboard Console, against the already-seeded DB:
ALTER TABLE questions ADD COLUMN owner_email TEXT;
CREATE INDEX IF NOT EXISTS idx_questions_owner ON questions (owner_email);
