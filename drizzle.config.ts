import type { Config } from 'drizzle-kit';

import { env } from '@/env';

export default {
  schema: './src/lib/db/schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: env.CLOUDFLARE_ACCOUNT_ID!,
    token: env.CLOUDFLARE_D1_TOKEN!,
    databaseId: env.CLOUDFLARE_D1_DATABASE_ID!,
  },
} satisfies Config;
