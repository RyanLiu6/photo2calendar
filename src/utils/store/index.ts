import type { D1Database } from '@cloudflare/workers-types';
import type { IScheduleStore } from './types';
import { SQLiteStore } from './sqlite';
import { D1Store } from './d1';

export function getStore(db?: D1Database): IScheduleStore {
  if (import.meta.env.DEV && !db) {
    return SQLiteStore.getInstance();
  }
  if (!db) {
    throw new Error('D1 database instance required in production');
  }
  return D1Store.getInstance(db);
}

export type { StoreData } from './types';
export { type IScheduleStore };
