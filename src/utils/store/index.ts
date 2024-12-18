import type { D1Database } from '@cloudflare/workers-types';
import type { IScheduleStore } from './types';
import { D1Store } from './d1';

export async function getStore(db?: D1Database): Promise<IScheduleStore> {
  console.log('Environment:', {
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
  });

  if (import.meta.env.DEV) {
    // Always use SQLite in development
    console.log('Using SQLite store for development');
    const { SQLiteStore } = await import('./sqlite');
    return SQLiteStore.getInstance();
  }

  // Require D1 in production
  if (!db) {
    throw new Error('D1 database instance required in production');
  }
  console.log('Using D1 store for production');
  return D1Store.getInstance(db);
}

export type { StoreData } from './types';
export { type IScheduleStore };
