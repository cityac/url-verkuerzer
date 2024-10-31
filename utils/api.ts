import { AuthValidations } from '@/models/authValidations'

const createURL = (path: string) => {
  return window.location.origin + path
}

export const getAuthValidations = async (): Promise<AuthValidations | null> => {
  const res = await fetch(
    new Request(createURL('/api/auth-validations'), {
      method: 'GET',
    }),
  )
  if (res.ok) {
    const data = await res.json()

    return data.data
  }
  return null
}
