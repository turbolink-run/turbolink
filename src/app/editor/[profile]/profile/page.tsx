import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Icons } from '@/components/icons';
import MagicTitle from '@/components/magic-title';
import { Button } from '@/components/ui/button';
import { auth } from '@/server/auth';
import { logOut } from '@/server/auth/actions/logOut';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Editor',
};

export interface EditorProfilePageParams {
  params: { profile: string };
}

export default async function EditorProfilePage({
  params,
}: EditorProfilePageParams) {
  const { user } = await auth();
  if (!user)
    redirect(
      `/login?next=${encodeURIComponent(`/editor/${params.profile}/profile`)}`,
    );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <MagicTitle size="large">
          Editor Profile Page: {params.profile}
        </MagicTitle>
        <form action={logOut} className="mt-auto">
          <Button variant="destructive" type="submit" className="w-full">
            <Icons.logOut className="mr-2 h-5 w-5" />
            Log Out
          </Button>
        </form>
      </div>
    </div>
  );
}
