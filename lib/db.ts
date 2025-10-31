import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

let db: Database.Database | null = null;

function readSql(file: string) {
  return fs.readFileSync(path.join(process.cwd(), 'lib', file), 'utf8');
}

export function getDb() {
  if (db) return db;
  const dbPath = path.join(process.cwd(), 'techmate.sqlite');
  const shouldInit = !fs.existsSync(dbPath);
  db = new Database(dbPath);
  db.pragma('foreign_keys = ON');
  if (shouldInit) {
    const schema = readSql('schema.sql');
    const seed = readSql('seed.sql');
    db.exec(schema);
    db.exec(seed);
  }
  return db;
}


