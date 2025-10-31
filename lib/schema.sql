PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS Symptoms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS Problems (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT CHECK(type IN ('hardware','software')) NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS Solutions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  problem_id INTEGER NOT NULL,
  solution_steps TEXT NOT NULL,
  FOREIGN KEY(problem_id) REFERENCES Problems(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ProblemSymptoms (
  symptom_id INTEGER NOT NULL,
  problem_id INTEGER NOT NULL,
  likelihood REAL NOT NULL DEFAULT 1.0,
  PRIMARY KEY (symptom_id, problem_id),
  FOREIGN KEY(symptom_id) REFERENCES Symptoms(id) ON DELETE CASCADE,
  FOREIGN KEY(problem_id) REFERENCES Problems(id) ON DELETE CASCADE
);


