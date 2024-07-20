import PagePlaceholder from '@/components/page-placeholder';

export const runtime = 'edge';

export default function HomePage() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center">
      <PagePlaceholder size="large">Turbolink</PagePlaceholder>
    </main>
  );
}
