import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getDb } from '../../../lib/db';

const BodySchema = z.object({
  symptomIds: z.array(z.number()).min(1)
});

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => ({}));
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid body', details: parsed.error.flatten() }, { status: 400 });
  }
  const { symptomIds } = parsed.data;
  const db = getDb();
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
  const rows = db.prepare(sql).all(...symptomIds);
  const results = rows.map((r: any) => ({
    problemId: r.problemId,
    name: r.problemName,
    type: r.problemType,
    description: r.problemDescription,
    likelihoodScore: r.score,
    matchedSymptoms: r.matchedSymptoms,
    solutionSteps: String(r.solutionSteps || '').split('\n').filter(Boolean)
  }));
  return NextResponse.json({ count: results.length, results });
}


