// Generated by Wrangler on Tue Jul 30 2024 18:53:52 GMT+0200 (Central European Summer Time)
// by running `wrangler types --env-interface CloudflareEnv env.d.ts`

interface CloudflareEnv {
	__NEXT_ON_PAGES__KV_SUSPENSE_CACHE: KVNamespace;
	CLOUDFLARE_ACCOUNT_ID: string;
	CLOUDFLARE_D1_TOKEN: string;
	CLOUDFLARE_D1_DATABASE_ID: string;
	AUTH_SECRET: string;
	GOOGLE_CLIENT_ID: string;
	GOOGLE_CLIENT_SECRET: string;
	NEXT_PUBLIC_APP_URL: string;
	DB: D1Database;
}
