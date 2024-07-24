import MagicTitle from '@/components/magic-title';

export const runtime = 'edge';

export default function HomePage() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center">
      <MagicTitle size="large">Turbolink</MagicTitle>
    </main>
  );
}
