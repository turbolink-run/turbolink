import { getRequestContext } from '@cloudflare/next-on-pages';
import { Resend } from 'resend';

export const runtime = 'edge';

export const getResendClient = () => {
  if (process.env.NODE_ENV !== 'production') {
    const { env } = getRequestContext();
    return new Resend(env.RESEND_API_KEY);
  }
  return new Resend(process.env.RESEND_API_KEY);
};

export const resend = getResendClient();
