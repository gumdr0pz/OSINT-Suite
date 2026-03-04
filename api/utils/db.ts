import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join(process.cwd(), 'osint.db'));

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS scan_history (
    id TEXT PRIMARY KEY,
    moduleId TEXT NOT NULL,
    target TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    data TEXT NOT NULL
  )
`);

export interface ScanEntry {
  id: string;
  moduleId: string;
  target: string;
  data: any;
}

export function saveScan(entry: ScanEntry) {
  const stmt = db.prepare('INSERT INTO scan_history (id, moduleId, target, data) VALUES (?, ?, ?, ?)');
  stmt.run(entry.id, entry.moduleId, entry.target, JSON.stringify(entry.data));
}

export function getHistory(limit = 50) {
  const stmt = db.prepare('SELECT * FROM scan_history ORDER BY timestamp DESC LIMIT ?');
  const rows = stmt.all(limit);
  return rows.map((row: any) => ({
    ...row,
    data: JSON.parse(row.data)
  }));
}

export function deleteScan(id: string) {
  const stmt = db.prepare('DELETE FROM scan_history WHERE id = ?');
  stmt.run(id);
}
