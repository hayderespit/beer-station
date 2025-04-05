import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = '/stations';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
