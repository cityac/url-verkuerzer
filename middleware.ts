import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { COOKIE_NAME } from './utils/constants'

async function verifyToken(token: string): Promise<boolean> {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    console.error('JWT_SECRET is not configured')
    return false
  }

  try {
    const secretKey = new TextEncoder().encode(secret)
    await jwtVerify(token, secretKey)
    return true
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)

  // Verify token validity and expiration
  let isValidToken = false
  if (token) {
    isValidToken = await verifyToken(token.value)
  }

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!isValidToken) {
      const response = NextResponse.redirect(new URL('/signup', request.url))
      // Clear invalid/expired cookie
      response.cookies.delete(COOKIE_NAME)
      return response
    }
  }

  // if user is signed in redirect to dashboard
  if (request.nextUrl.pathname.startsWith('/signin') || request.nextUrl.pathname.startsWith('/signup')) {
    if (isValidToken) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/signin', '/signup'],
}
