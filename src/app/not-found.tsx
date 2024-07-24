import { Metadata } from 'next';

import MagicTitle from '@/components/magic-title';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFoundPage() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center">
      <MagicTitle size="large">Page Not Found</MagicTitle>
    </main>
  );
}
