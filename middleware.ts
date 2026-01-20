import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { COOKIE_NAME } from './utils/constants'

const SECRET = process.env.JWT_SECRET

export function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)

  // Verify token validity and expiration
  let isValidToken = false
  if (token) {
    try {
      if (SECRET) {
        jwt.verify(token.value, SECRET)
        isValidToken = true
      }
    } catch (error) {
      // Token is invalid or expired
      isValidToken = false
    }
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
