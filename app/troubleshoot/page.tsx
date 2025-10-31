"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '../../components/ThemeToggle';

type Symptom = { id: number; name: string; description?: string };
type DiagnoseResult = {
  problemId: number;
  name: string;
  type: 'hardware' | 'software';
  description?: string;
  likelihoodScore: number;
  matchedSymptoms: number;
  solutionSteps: string[];
};

export default function TroubleshootPage() {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [results, setResults] = useState<DiagnoseResult[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/symptoms')
      .then(r => r.json())
      .then(setSymptoms)
      .catch(() => setSymptoms([]));
  }, []);

  function toggle(id: number) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  async function diagnose() {
    if (selected.length === 0) return alert('Please select at least one symptom.');
    setLoading(true);
    setResults(null);
    try {
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptomIds: selected })
      });
      const data = await res.json();
      setResults(data.results || []);
    } finally {
      setLoading(false);
    }
  }

  function clearAll() {
    setSelected([]);
    setResults(null);
  }

  return (
    <div className="container app-wrap">
      <header>
        <div className="brand">TechMate</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link className="btn secondary" href="/">Home</Link>
          <ThemeToggle />
        </div>
      </header>

      <section className="app-grid">
        <div className="panel">
          <h3>Select Symptoms</h3>
          <div className="symptom-list" aria-live="polite">
            {symptoms.length === 0 && <div>Loading symptoms...</div>}
            {symptoms.map(s => (
              <label key={s.id} className="symptom-item">
                <input
                  type="checkbox"
                  checked={selected.includes(s.id)}
                  onChange={() => toggle(s.id)}
                />
                <div style={{ display: 'grid' }}>
                  <div style={{ fontWeight: 600 }}>{s.name}</div>
                  <div style={{ color: 'var(--muted)', fontSize: 13 }}>{s.description}</div>
                </div>
              </label>
            ))}
          </div>
          <div className="actions">
            <button onClick={clearAll} className="btn secondary" type="button">Clear</button>
            <button onClick={diagnose} className="btn" type="button" disabled={loading}>
              {loading ? 'Analyzing...' : 'Diagnose'}
            </button>
          </div>
        </div>

        <div className="panel">
          <h3>Results</h3>
          <div className="results" aria-live="polite">
            {results === null && <div>Select symptoms and click Diagnose.</div>}
            {results && results.length === 0 && <div>No probable problems found. Try selecting more symptoms.</div>}
            {results && results.map(r => (
              <div key={r.problemId} className="result-item">
                <h4>{r.name} ({r.type})</h4>
                <div className="result-meta">Likelihood score: {r.likelihoodScore.toFixed(2)} • Matched symptoms: {r.matchedSymptoms}</div>
                {r.description && <div style={{ margin: '6px 0 8px' }}>{r.description}</div>}
                {r.solutionSteps.length > 0 && (
                  <>
                    <div style={{ fontWeight: 600, marginTop: 6 }}>Steps:</div>
                    <ol>
                      {r.solutionSteps.map((s, i) => <li key={i}>{s}</li>)}
                    </ol>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


