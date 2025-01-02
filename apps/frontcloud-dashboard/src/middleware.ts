import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Middleware function
export function middleware(request: NextRequest) {
  console.log('\n-> (m)request url =>', request.nextUrl.toString());

  const token = request.cookies.get('token')?.value; // Extract token from cookies
  const { pathname } = request.nextUrl; // Get the current path

  // Public routes: Allow access without a token
  const publicRoutes = ['/', '/sign-in', '/about', '/contact']; // Add other public routes here
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  // Protected route: Redirect unauthenticated users trying to access protected pages
  if (!token && pathname.startsWith('/dashboard')) {
    console.log('-> (m)Unauthenticated access to /dashboard, redirecting to /sign-in');
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Authenticated route: Prevent logged-in users from accessing login or sign-up pages
  if (token && pathname.startsWith('/sign-in')) {
    console.log('-> (m)Authenticated user trying to access /sign-in, redirecting to /dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Request forwarding for /api routes (if needed)
  if (pathname.startsWith('/api')) {
    const api_url =
      process.env.NODE_ENV === 'production'
        ? process.env.API_URL
        : process.env.DEV_API_URL;

    const url = new URL(api_url + request.nextUrl.pathname + request.nextUrl.search);

    console.log('-> (m)Forwarding /api request to:', url.toString());
    return NextResponse.rewrite(url.toString(), {
      request,
      headers: {
        ...request.headers,
      },
      statusText: 'Rewriting to API',
    });
  }

  return NextResponse.next();
}

// Middleware configuration
export const config = {
  matcher: [
    // Match all requests except static files and Next.js internals
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
