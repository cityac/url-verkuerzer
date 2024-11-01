'use server'
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
    email: formData.get('email'),
    password: formData.get('password'),
  })

  console.log({ data })

  try {
    const { token } = await signup(data)
    var cook = await require('next/headers').cookies()
    cook.set(COOKIE_NAME, token)
  } catch (e) {
    console.error(e)
    return { message: 'Failed to sign you up' }
  }

  redirect('/dashboard')
}
