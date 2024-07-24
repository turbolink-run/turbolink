import { getRequestContext } from '@cloudflare/next-on-pages';
import { drizzle } from 'drizzle-orm/d1';

import { env } from '@/env';

import * as schema from './schema';

const globalForDb = globalThis as unknown as {
  client?: D1Database;
};

export let client: D1Database | undefined;

export const db = () => {
  client = globalForDb.client ?? getRequestContext().env.DB;
  if (env.NODE_ENV !== 'production') globalForDb.client = client;
  return drizzle(client, { schema });
};
