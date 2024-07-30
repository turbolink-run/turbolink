import MagicTitle from '@/components/magic-title';

export const runtime = 'edge';

export interface ProfilePageParams {
  params: { profile: string };
}

export function generateMetadata({ params }: ProfilePageParams) {
  return {
    title: `@${params.profile}`,
  };
}

export default function ProfilePage({ params }: ProfilePageParams) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <MagicTitle size="large">Profile Page: {params.profile}</MagicTitle>
    </div>
  );
}
