import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { auth } from '@/server/auth';

import LoginForm from './_components/form';

export const runtime = 'edge';

export interface LoginPageParams {
  searchParams: { next?: string };
}

export const metadata: Metadata = {
  title: 'Login',
};

export default async function LoginPage({ searchParams }: LoginPageParams) {
  const { user } = await auth();
  if (user) redirect('/editor');

  return <LoginForm next={searchParams.next} />;
}
