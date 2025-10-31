import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'techmate.sqlite');

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database(DB_PATH);

// Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Get all symptoms
app.get('/api/symptoms', (req, res) => {
  db.all('SELECT id, name, description FROM Symptoms ORDER BY name ASC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: String(err) });
    }
    res.json(rows);
  });
});

// Diagnose based on selected symptom IDs
app.post('/api/diagnose', (req, res) => {
  const body = req.body || {};
  const symptomIds = Array.isArray(body.symptomIds) ? body.symptomIds : [];

  if (symptomIds.length === 0) {
    return res.status(400).json({ error: 'Provide at least one symptom id', hint: 'symptomIds: number[]' });
  }

  const placeholders = symptomIds.map(() => '?').join(',');
  const sql = `
    SELECT p.id as problemId, p.name as problemName, p.type as problemType, p.description as problemDescription,
           s.solution_steps as solutionSteps,
           SUM(ps.likelihood) as score,
           COUNT(DISTINCT ps.symptom_id) as matchedSymptoms
    FROM Problems p
    JOIN ProblemSymptoms ps ON ps.problem_id = p.id
    LEFT JOIN Solutions s ON s.problem_id = p.id
    WHERE ps.symptom_id IN (${placeholders})
    GROUP BY p.id
    ORDER BY score DESC, matchedSymptoms DESC
    LIMIT 10;
  `;

  db.all(sql, symptomIds, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: String(err) });
    }

    // Map results to clean structure
    const results = rows.map(r => ({
      problemId: r.problemId,
      name: r.problemName,
      type: r.problemType,
      description: r.problemDescription,
      likelihoodScore: r.score,
      matchedSymptoms: r.matchedSymptoms,
      solutionSteps: (r.solutionSteps || '').split('\n').filter(Boolean)
    }));

    res.json({ count: results.length, results });
  });
});

app.listen(PORT, () => {
  console.log(`TechMate API listening on http://localhost:${PORT}`);
});


