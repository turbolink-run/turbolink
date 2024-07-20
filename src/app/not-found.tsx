import { Metadata } from 'next';

import PagePlaceholder from '@/components/page-placeholder';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFoundPage() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center">
      <PagePlaceholder size="large">Page Not Found</PagePlaceholder>
    </main>
  );
}
