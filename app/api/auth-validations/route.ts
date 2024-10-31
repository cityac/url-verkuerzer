import { delay } from '@/utils/delay'
import { NextResponse } from 'next/server'

export const GET = async () => {
  await delay(500)
  return NextResponse.json({
    data: {
      email: [{ title: 'Email is required' }],
      password: [
        { title: '8 characters or more (no spaces)', rules: { min: 8, max: 64 } },
        { title: 'Uppercase and lowercase letters', rules: { uppercase: 1, lowercase: 1 } },
        { title: 'At least one digit', rules: { digit: 1 } },
      ],
    },
  })
}
