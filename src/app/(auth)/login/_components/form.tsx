import Link from 'next/link';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface LoginFormProps {
  next?: string;
}

export default function LoginForm({ next }: LoginFormProps) {
  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="text-center">Log in to Turbolink</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Button variant="outline" className="w-full" asChild>
            <Link
              href={`/login/google${next ? `?next=${encodeURIComponent(next)}` : ''}`}
            >
              <Icons.google className="mr-2 h-5 w-5" />
              Continue with Google
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
