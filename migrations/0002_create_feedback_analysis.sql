CREATE TABLE IF NOT EXISTS feedback_analysis (
  feedback_id INTEGER PRIMARY KEY,
  category TEXT NOT NULL,
  sentiment TEXT NOT NULL CHECK (sentiment IN ('positive', 'neutral', 'negative')),
  urgency TEXT NOT NULL CHECK (urgency IN ('high', 'medium', 'low')),
  labeled_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (feedback_id) REFERENCES feedback(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_analysis_category
  ON feedback_analysis(category);

CREATE INDEX IF NOT EXISTS idx_analysis_sentiment
  ON feedback_analysis(sentiment);

CREATE INDEX IF NOT EXISTS idx_analysis_urgency
  ON feedback_analysis(urgency);