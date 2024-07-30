import { cookies } from 'next/headers';

import { generateState } from 'arctic';

import { env } from '@/env';
import { google } from '@/server/auth/providers/google';

export const runtime = 'edge';

export async function GET(request: Request): Promise<Response> {
  const state = generateState();
  const url = await google.createAuthorizationURL(state, env.AUTH_SECRET, {
    scopes: ['profile', 'email'],
  });

  cookies().set('google_oauth_state', state, {
    path: '/',
    secure: env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  });

  const requestUrl = new URL(request.url);
  const next = requestUrl.searchParams.get('next');
  if (next) {
    cookies().set('next', next);
  }

  return Response.redirect(url);
}
