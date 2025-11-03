import { Pool, QueryResult, QueryResultRow } from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in .env.local');
}

declare global {
  var pgPool: Pool | undefined;
}

const pool =
  global.pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== 'production') global.pgPool = pool;

console.log(process.env.NODE_ENV);

export async function query<T extends QueryResultRow>(
  text: string,
  params?: (string | number | boolean | Date)[]
): Promise<QueryResult<T>> {
  const start = Date.now();
  const res = await pool.query<T>(text, params);
  const duration = Date.now() - start;
  console.log('Eksekusi query', { text, duration, rows: res.rowCount });
  return res;
}

export async function checkConnection(): Promise<boolean> {
  try {
    const result = await pool.query('SELECT NOW() AS current_time');
    console.log('✅ Database terhubung, Waktu : ', result.rows[0].current_time);
    return true;
  } catch (error) {
    console.error('❌ Database tidak terhubung:', error);
    return false;
  }
}
