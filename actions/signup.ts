'use server'
import { FormData } from '@/models/uiValidations'
import { signup } from '@/utils/authTools'
import { COOKIE_NAME } from '@/utils/constants'

import { redirect } from 'next/navigation'
import { z } from 'zod'

const authSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const registerUser = async (prevState: any, formData: FormData) => {
  const data = authSchema.parse({
    email: formData.email,
    password: formData.password,
  })

  try {
    const { token } = await signup(data)
    var cook = await require('next/headers').cookies()
    cook.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
  } catch (e) {
    console.error(e)
    let message = 'Failed to sign you up.' + (e.code === 'SQLITE_CONSTRAINT' ? ' Account already exists' : '')

    return { message }
  }
  redirect('/dashboard')
}
