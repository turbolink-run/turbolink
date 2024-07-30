import { cookies } from 'next/headers';

import { OAuth2RequestError } from 'arctic';
import { and, eq } from 'drizzle-orm';
import { generateIdFromEntropySize } from 'lucia';
import { z } from 'zod';

import WelcomeEmail from '@/emails/welcome';
import { env } from '@/env';
import { lucia } from '@/server/auth/lucia';
import { google } from '@/server/auth/providers/google';
import { db } from '@/server/db';
import { oauthAccountTable, userTable } from '@/server/db/schema';
import { resend } from '@/server/resend';

export const runtime = 'edge';

const googleUserSchema = z.object({
  sub: z.string(),
  name: z.string(),
  picture: z.string(),
  email: z.string(),
});

type GoogleUser = z.infer<typeof googleUserSchema>;

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState = cookies().get('google_oauth_state')?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, { status: 400 });
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      env.AUTH_SECRET,
    );
    const googleUserResponse = await fetch(
      'https://openidconnect.googleapis.com/v1/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );
    const parsedGoogleUser = googleUserSchema.safeParse(
      await googleUserResponse.json(),
    );
    if (!parsedGoogleUser.success) {
      return new Response(null, { status: 400 });
    }

    const googleUser: GoogleUser = parsedGoogleUser.data;

    const existingUser = await db.query.userTable.findFirst({
      where: eq(userTable.email, googleUser.email),
    });
    if (existingUser) {
      const existingAccount = await db.query.oauthAccountTable.findFirst({
        where: and(
          eq(oauthAccountTable.providerId, 'google'),
          eq(oauthAccountTable.providerUserId, googleUser.sub),
        ),
      });
      if (!existingAccount) {
        await db.insert(oauthAccountTable).values({
          providerId: 'google',
          providerUserId: googleUser.sub,
          userId: existingUser.id,
        });
      }

      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      const next = cookies().get('next')?.value;
      if (next) {
        // eslint-disable-next-line drizzle/enforce-delete-with-where
        cookies().delete('next');
        return new Response(null, {
          status: 302,
          headers: {
            Location: next,
          },
        });
      }

      return new Response(null, {
        status: 302,
        headers: {
          Location: '/editor',
        },
      });
    }

    const userId = generateIdFromEntropySize(10);
    await db.batch([
      db.insert(userTable).values({
        id: userId,
        name: googleUser.name,
        email: googleUser.email,
        image: googleUser.picture,
      }),
      db.insert(oauthAccountTable).values({
        providerId: 'google',
        providerUserId: googleUser.sub,
        userId,
      }),
    ]);

    await resend.emails.send({
      from: 'Contact <contact@turbol.ink>',
      to: googleUser.email,
      subject: 'Welcome to Turbolink',
      react: WelcomeEmail({ name: googleUser.name }),
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/editor',
      },
    });
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}
