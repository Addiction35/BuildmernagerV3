// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

interface JwtPayload {
  exp?: number // standard JWT expiry (in seconds)
  [key: string]: any
}

function isTokenExpired(token: string): boolean {
  try {
    const payloadBase64 = token.split('.')[1]
    const decodedJson = Buffer.from(payloadBase64, 'base64').toString()
    const decoded = JSON.parse(decodedJson) as JwtPayload

    if (!decoded.exp) return true // no expiry → treat as expired

    const currentTime = Math.floor(Date.now() / 1000) // in seconds
    return decoded.exp < currentTime
  } catch (err) {
    console.error('❌ Invalid token in middleware:', err)
    return true // treat parsing errors as expired
  }
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const pathname = req.nextUrl.pathname

  // Define public routes
  const publicPaths = ['/', '/login', '/signup']
  const isPublic =
    publicPaths.includes(pathname) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/api/public')

  if (!isPublic) {
    // Redirect if no token or expired token
    if (!token || isTokenExpired(token)) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/public).*)',
  ],
}
