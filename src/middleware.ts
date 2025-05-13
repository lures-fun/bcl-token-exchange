import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('flag')?.value;

  const { pathname } = request.nextUrl;

  const isProtectedPath =
    pathname.startsWith('/shop') ||
    pathname.startsWith('/product') ||
    pathname.startsWith('/cart') ||
    pathname.startsWith('/history');

  if (token) {
    return NextResponse.next();
  } else {
    if (isProtectedPath) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/product/:path*', '/shop/:path*', '/cart/:path*', '/history/:path*'],
};
