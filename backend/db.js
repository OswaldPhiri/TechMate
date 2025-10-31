import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'techmate.sqlite');
const schemaPath = path.join(__dirname, 'schema.sql');
const seedPath = path.join(__dirname, 'seed.sql');

function runSql(db, sql) {
  return new Promise((resolve, reject) => {
    db.exec(sql, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

async function reset() {
  if (fs.existsSync(DB_PATH)) {
    fs.unlinkSync(DB_PATH);
  }
  const db = new sqlite3.Database(DB_PATH);
  try {
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    const seedSql = fs.readFileSync(seedPath, 'utf8');
    await runSql(db, schemaSql);
    await runSql(db, seedSql);
    console.log('Database reset complete:', DB_PATH);
  } catch (e) {
    console.error('DB reset error:', e);
    process.exitCode = 1;
  } finally {
    db.close();
  }
}

if (process.argv.includes('--reset')) {
  reset();
}


