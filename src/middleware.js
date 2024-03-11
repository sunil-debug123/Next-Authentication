import { NextResponse } from 'next/server'

export function middleware(request) {
  const { nextUrl } = request;
  const { pathname } = nextUrl;
  const isPublic = pathname === '/login' || pathname === '/signup';
  const token = request.cookies.get('token')?.value || '';

  if (pathname === '/' && token) {
    // Redirect to dashboard if user is authenticated
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }

  if (!token && !isPublic) {
    // Redirect to login page if user is not authenticated and not on login page
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}
 
export const config = {
  // Add your paths here
  matcher: [
    '/',
    '/dashboard',
    '/login',
    '/signup'
  ],
}
