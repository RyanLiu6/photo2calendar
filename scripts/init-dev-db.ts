import { SQLiteStore } from '../src/utils/store/sqlite';

async function initDevDb() {
  console.log('Initializing development SQLite database...');
  const store = SQLiteStore.getInstance();

  // Test the connection
  const testId = 'test';
  await store.set(testId, {
    data: [{ name: 'Test', date: '2024-03-20', shift: '9-5' }],
    expiry: Date.now() + 3600000
  });

  const result = await store.get(testId);
  console.log('Test read result:', result);

  await store.delete(testId);
  console.log('Development database initialized and tested successfully');
}

initDevDb().catch(console.error);
