import type { D1Database } from '@cloudflare/workers-types';
import type { IScheduleStore, StoreData } from './types';

export class D1Store implements IScheduleStore {
  private static instance: D1Store;
  private db: D1Database;

  private constructor(db: D1Database) {
    this.db = db;
    this.init();
  }

  private async init() {
    await this.db
      .prepare(`
        CREATE TABLE IF NOT EXISTS schedules (
          id TEXT PRIMARY KEY,
          data TEXT NOT NULL,
          expiry INTEGER NOT NULL
        )
      `)
      .run();
  }

  public static async getInstance(db: D1Database): Promise<D1Store> {
    if (!D1Store.instance) {
      D1Store.instance = new D1Store(db);
      await D1Store.instance.init();
    }
    return D1Store.instance;
  }

  public async set(id: string, data: StoreData): Promise<void> {
    await this.db
      .prepare('INSERT OR REPLACE INTO schedules (id, data, expiry) VALUES (?, ?, ?)')
      .bind(id, JSON.stringify(data), data.expiry)
      .run();
  }

  public async get(id: string): Promise<StoreData | undefined> {
    const row = await this.db
      .prepare('SELECT * FROM schedules WHERE id = ? AND expiry > ?')
      .bind(id, Date.now())
      .first();

    return row ? JSON.parse(row.data as string) : undefined;
  }

  public async delete(id: string): Promise<void> {
    await this.db.prepare('DELETE FROM schedules WHERE id = ?').bind(id).run();
  }

  public async cleanup(): Promise<void> {
    await this.db.prepare('DELETE FROM schedules WHERE expiry < ?').bind(Date.now()).run();
  }
}
