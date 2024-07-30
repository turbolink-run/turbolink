import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import MagicTitle from '@/components/magic-title';
import { auth } from '@/server/auth';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Editor',
};

export default async function EditorHomePage() {
  const { user } = await auth();
  if (!user) redirect('/login');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <MagicTitle size="large">Editor Home Page</MagicTitle>
    </div>
  );
}
