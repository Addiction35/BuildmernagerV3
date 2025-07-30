// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const pathname = req.nextUrl.pathname

  const publicPaths = ['/', '/login', '/signup', '/_next', '/favicon.ico', '/api']

  const isPublic = publicPaths.some((path) => pathname.startsWith(path))

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*'],
}
