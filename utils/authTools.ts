import { db } from '@/db/db'
import { users } from '@/db/schema'
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import 'server-only'

function getSecret(): string {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET
  if (!secret) {
    throw new Error('NEXT_PUBLIC_JWT_SECRET environment variable is not set')
  }
  return secret
}

export const createTokenForUser = (userId: string) => {
  const token = jwt.sign({ id: userId }, getSecret(), {
    expiresIn: '7d', // 7 days
  })
  return token
}

export const getUserFromToken = async (token: { name: string; value: string }) => {
  try {
    const payload = jwt.verify(token.value, getSecret()) as { id: string }

    const user = await db.query.users.findFirst({
      where: eq(users.id, payload.id),
      columns: {
        id: true,
        email: true,
        createdAt: true,
      },
    })

    return user
  } catch (error) {
    // Token is invalid or expired
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid or expired token')
    }
    throw error
  }
}

export const signin = async ({ email, password }: { email: string; password: string }) => {
  const match = await db.query.users.findFirst({
    where: eq(users.email, email),
  })

  if (!match) throw new Error('invalid user')

  const correctPW = await comparePW(password, match.password)

  if (!correctPW) {
    throw new Error('invalid user')
  }

  const token = createTokenForUser(match.id)
  const { password: pw, ...user } = match

  return { user, token }
}

export const signup = async ({ email, password }: { email: string; password: string }) => {
  const hashedPW = await hashPW(password)
  const rows = await db.insert(users).values({ email, password: hashedPW }).returning({
    id: users.id,
    email: users.email,
    createdAt: users.createdAt,
  })

  const user = rows[0]
  const token = createTokenForUser(user.id)

  return { user, token }
}

export const hashPW = (password: string) => {
  return bcrypt.hash(password, 10)
}

export const comparePW = (password: string, hashedPW: string) => {
  return bcrypt.compare(password, hashedPW)
}
