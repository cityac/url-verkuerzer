'use server'

import { COOKIE_NAME } from '@/utils/constants'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const signout = async () => {
  const cook = await cookies()
  cook.delete(COOKIE_NAME)
  redirect('/signup')
}
