import type { Config } from 'drizzle-kit';

import { env } from '@/env';

export default {
  schema: './src/lib/db/schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: `file:${env.LOCAL_DB_PATH!}`,
  },
} satisfies Config;
