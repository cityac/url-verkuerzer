'use client'
import { AuthValidations } from '@/models/authValidations'
import { getAuthValidations } from '@/utils/api'
import { useEffect, useState } from 'react'
import SignButton from './SignButton'
import { SignInput } from './SignInput'
import { useValidation } from './validation/schema'

export const SignForm = () => {
  const [validations, setValidations] = useState<AuthValidations | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useValidation(validations)

  useEffect(() => {
    const fetch = async () => {
      const authValidations = await getAuthValidations()
      setValidations(authValidations)
    }
    fetch()
  }, [])

  type Rule = { rule: string; className: string }
  type ValidationRules = Record<string, Rule>

  const validationRules: ValidationRules = {
    characters: {
      rule: '8 characters or more (no spaces)',
      className: '',
    },
    uppercase: {
      rule: 'Uppercase and lowercase letters',
      className: '',
    },
    digit: {
      rule: 'At least one digit',
      className: '',
    },
  }
  const onSubmit = (data: any) => {
    debugger
    console.log({ data })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10 w-80">
      <div className="grid gap-5">
        <SignInput type="email" placeholder="Email" {...register('email')} />
        <SignInput type="password" placeholder="Create you password" {...register('password')} />
        <div className="grid gap-1 px-5">
          {Object.entries(validationRules).map(([key, value]) => (
            <p key={key}>{value.rule}</p>
          ))}
          {/* <p className="text-clario-green-50">8 characters or more (no spaces)</p>
          <p className="text-primary">Uppercase and lowercase letters</p>
          <p className="text-clario-red-300">At least one digit</p> */}
        </div>
        <div>{errors.email?.message}</div>
        <div>{errors.password?.message}</div>
      </div>
      <div className="mt-10 flex w-full justify-around">
        <SignButton label={'Sign-up'} />
      </div>
    </form>
  )
}
