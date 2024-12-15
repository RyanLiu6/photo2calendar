import type { ScheduleEntry } from '../processSchedule';

export interface StoreData {
  data: ScheduleEntry[];
  expiry: number;
}

export interface IScheduleStore {
  set(id: string, data: StoreData): Promise<void>;
  get(id: string): Promise<StoreData | undefined>;
  delete(id: string): Promise<void>;
  cleanup(): Promise<void>;
}
