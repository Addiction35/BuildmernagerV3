
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = [
  '/',
  '/Dashboard',

]

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const url = req.nextUrl.pathname

  if (protectedRoutes.some(route => url.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: protectedRoutes.flatMap(route => [route, `${route}/:path*`]),
}