import { getRequestContext } from '@cloudflare/next-on-pages';
import { drizzle } from 'drizzle-orm/d1';

import * as schema from './schema';

export const runtime = 'edge';

function getDB() {
  if (process.env.NODE_ENV !== 'production') {
    const { env } = getRequestContext();
    return drizzle(env.DB, { schema });
  }
  return drizzle(process.env.DB as unknown as D1Database, { schema });
}

export const db = getDB();
