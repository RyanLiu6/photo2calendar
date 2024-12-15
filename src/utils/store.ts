import Database from 'better-sqlite3';
import { join } from 'path';
import { type ScheduleEntry } from './processSchedule';

interface StoreData {
  data: ScheduleEntry[];
  expiry: number;
}

interface ScheduleRow {
  data: string;
  expiry: number;
}

// Make it a singleton store that's shared across the application
class ScheduleStore {
  private static instance: ScheduleStore;
  private db: Database.Database;

  private constructor() {
    // Store the database in the project root
    this.db = new Database(join(process.cwd(), 'schedules.db'));
    this.init();
  }

  private init() {
    // Create the schedules table if it doesn't exist
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS schedules (
        id TEXT PRIMARY KEY,
        data TEXT NOT NULL,
        expiry INTEGER NOT NULL
      )
    `);

    // Clean up expired entries every minute
    setInterval(() => {
      this.db.prepare('DELETE FROM schedules WHERE expiry < ?')
        .run(Date.now());
    }, 60000);
  }

  public static getInstance(): ScheduleStore {
    if (!ScheduleStore.instance) {
      ScheduleStore.instance = new ScheduleStore();
    }
    return ScheduleStore.instance;
  }

  public set(id: string, data: StoreData): void {
    this.db.prepare(`
      INSERT OR REPLACE INTO schedules (id, data, expiry)
      VALUES (?, ?, ?)
    `).run(id, JSON.stringify(data), Date.now() + 3600000); // 1 hour expiry
  }

  public get(id: string): StoreData | undefined {
    const row = this.db.prepare<[string, number], ScheduleRow>('SELECT data FROM schedules WHERE id = ? AND expiry > ?')
      .get(id, Date.now());
    return row ? JSON.parse(row.data) : undefined;
  }

  public delete(id: string): void {
    this.db.prepare('DELETE FROM schedules WHERE id = ?')
      .run(id);
  }
}

export const scheduleStore = ScheduleStore.getInstance();
