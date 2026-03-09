import { NextRequest, NextResponse } from 'next/server';
import { createAgentSeoMiddleware } from '@agent-seo/next/middleware';

const agentSeoMiddleware = createAgentSeoMiddleware();

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';

  if (
    hostname === 'cv.felipepontiggia.com' ||
    hostname === 'resume.felipepontiggia.com'
  ) {
    return NextResponse.rewrite(
      new URL('/pontiggia_felipe_resume_en.pdf', request.url),
    );
  }

  return agentSeoMiddleware(request);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
