'use client'
import { registerUser } from '@/actions/sign-up'
import { AuthValidations, UIValidationRule } from '@/models/authValidations'
import { getAuthValidations } from '@/utils/api'
import Link from 'next/link'
import { useActionState, useEffect, useRef, useState } from 'react'
import SignButton from './SignButton'
import { SignInput } from './SignInput'
import { useValidation } from './validation/schema'

type State = { message: string | null }
const initState: State = { message: null }

export const SignForm = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [validations, setValidations] = useState<AuthValidations | null>(null)
  const [validationRules, setValidationRules] = useState<UIValidationRule[] | null>(null)

  const [, formAction] = useActionState<State, FormData>(registerUser, initState)

  const {
    register,
    formState: { touchedFields },
    errors,
  } = useValidation(validations)

  useEffect(() => {
    const fetch = async () => {
      const authValidations = await getAuthValidations()

      setValidations(authValidations)
    }
    fetch()
  }, [])

  useEffect(() => {
    if (!validations?.password.length) {
      return
    }
    const rules: UIValidationRule[] = validations.password.map((rule) => {
      let className = 'text-primary'
      if (touchedFields.password) {
        const error =
          errors?.password?.violatedRuleIds?.find((id) => rule.id === id) ||
          errors.password?.message === 'Password is required'
        className = error ? 'text-clario-red-300' : 'text-clario-green-300'
      }

      return {
        id: rule.id,
        title: rule.title,
        className,
      }
    })
    setValidationRules(rules)
  }, [validations, errors, touchedFields])

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.setCustomValidity(errors?.email?.message ? errors.email.message : '')
    }
    if (passwordRef.current) {
      passwordRef.current.setCustomValidity(errors?.password?.message ? errors.password.message : '')
    }
  }, [emailRef, passwordRef, errors, touchedFields])

  return (
    <form className="mt-10 w-80" noValidate action={formAction}>
      <div className="grid gap-5">
        <SignInput name="email" type="text" placeholder="Email" register={register} ref={emailRef} />
        <SignInput
          name="password"
          type="password"
          placeholder="Create you password"
          register={register}
          ref={passwordRef}
        />
        <div className="grid gap-1 px-5">
          {validationRules &&
            validationRules.map((rule) => (
              <p className={rule.className} key={rule.id}>
                {rule.title}
              </p>
            ))}
        </div>
      </div>
      <div className="mt-10 flex w-full justify-around">
        <SignButton label={'Sign-up'} />
      </div>
      <div className="mt-10 flex w-full justify-around">
        <Link href="/sign-in">{`Already have an account?`}</Link>
      </div>
    </form>
  )
}
