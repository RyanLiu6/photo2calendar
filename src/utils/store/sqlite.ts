import Database from 'better-sqlite3';
import { join } from 'path';
import type { IScheduleStore, StoreData } from './types';

interface ScheduleRow {
  data: string;
  expiry: number;
}

export class SQLiteStore implements IScheduleStore {
  private static instance: SQLiteStore;
  private db: Database.Database;

  private constructor() {
    this.db = new Database(join(process.cwd(), 'schedules.db'));
    this.init();
  }

  private init() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS schedules (
        id TEXT PRIMARY KEY,
        data TEXT NOT NULL,
        expiry INTEGER NOT NULL
      )
    `);
  }

  public static getInstance(): SQLiteStore {
    if (!SQLiteStore.instance) {
      SQLiteStore.instance = new SQLiteStore();
    }
    return SQLiteStore.instance;
  }

  public async set(id: string, data: StoreData): Promise<void> {
    this.db.prepare(`
      INSERT OR REPLACE INTO schedules (id, data, expiry)
      VALUES (?, ?, ?)
    `).run(id, JSON.stringify(data), data.expiry);
  }

  public async get(id: string): Promise<StoreData | undefined> {
    const row = this.db.prepare<[string, number], ScheduleRow>('SELECT * FROM schedules WHERE id = ? AND expiry > ?')
      .get(id, Date.now());
    return row ? JSON.parse(row.data) : undefined;
  }

  public async delete(id: string): Promise<void> {
    this.db.prepare('DELETE FROM schedules WHERE id = ?').run(id);
  }

  public async cleanup(): Promise<void> {
    this.db.prepare('DELETE FROM schedules WHERE expiry < ?')
      .run(Date.now());
  }
}
