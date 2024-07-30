import { NextRequest, NextResponse } from 'next/server';

import { verifyRequestOrigin } from 'lucia';

export async function middleware(request: NextRequest): Promise<NextResponse> {
  if (request.method === 'GET') {
    return NextResponse.next();
  }

  /**
   * CSRF protection
   * https://lucia-auth.com/guides/validate-session-cookies/nextjs-app
   */
  const originHeader = request.headers.get('Origin');
  const hostHeader = request.headers.get('Host');
  if (
    !originHeader ||
    !hostHeader ||
    !verifyRequestOrigin(originHeader, [hostHeader])
  ) {
    return new NextResponse(null, { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|static|.*\\..*|_next|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
