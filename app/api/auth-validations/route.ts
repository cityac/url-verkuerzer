import { delay } from '@/utils/delay'
import { NextResponse } from 'next/server'

// mocked http Get method
// emulates receiving signup/signing validation rules from the server
export const GET = async () => {
  await delay(500)
  return NextResponse.json({
    data: {
      email: [{ title: 'Email is required' }],
      password: [
        { id: 'characters', title: '8 characters or more (no spaces)', rules: { min: 8, max: 64 } },
        { id: 'upper-lower-case', title: 'Uppercase and lowercase letters', rules: { uppercase: 1, lowercase: 1 } },
        { id: 'digits', title: 'At least one digit', rules: { digit: 1 } },
      ],
    },
  })
}
