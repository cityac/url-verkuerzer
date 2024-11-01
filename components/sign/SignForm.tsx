'use client'

import { registerUser } from '@/actions/signup'
import { AuthValidations } from '@/models/authValidations'
import { FormData } from '@/models/uiValidations'
import { getAuthValidations } from '@/utils/api'
import { yupResolver } from '@hookform/resolvers/yup'
import { startTransition, useActionState, useEffect, useMemo, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { object, string } from 'yup'
import SignButton from './SignButton'
import { SignInput } from './SignInput'
import { useValidation } from './validation/schema'

type State = { message: string | null }
const initState: State = { message: null }

// with a little changes this component could be used for sing in as well
export const SignForm = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [validations, setValidations] = useState<AuthValidations | null>(null)

  const [actionState, formAction] = useActionState<State, FormData>(registerUser, initState)

  const validationSchema = useMemo(() => {
    const authRules = validations || ({} as AuthValidations)
    return object().shape({
      email: string().required('Email is required').email('Invalid email address'),
      password: string().password(authRules.password || []),
    })
  }, [validations])

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(validationSchema),
  })
  const fieldErrors = useValidation(formState)

  const validationRules = useMemo(() => {
    if (!validations) return []

    return validations.password.map((rule) => {
      let className = 'text-primary'
      // this allows to make 99% of css with Tailwind
      if (formState.touchedFields.email && formState.submitCount > 0) {
        emailRef.current?.setAttribute('aria-submitted', 'true')
      }
      if (formState.touchedFields.password && formState.submitCount > 0) {
        passwordRef.current?.setAttribute('aria-submitted', 'true')
        const error =
          fieldErrors.password?.violatedRuleIds?.find((id) => rule.id === id) ||
          fieldErrors.password?.message === 'Password is required'
        // used to highlight with the color validation rules under the password input field
        className = error ? 'text-clario-red-300' : 'text-clario-green-300'
      }
      return {
        id: rule.id,
        title: rule.title,
        className,
      }
    })
  }, [fieldErrors, validations, formState])

  useEffect(() => {
    const fetch = async () => {
      const authValidations = await getAuthValidations()
      setValidations(authValidations)
    }
    fetch()
  }, [])

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.setCustomValidity(fieldErrors?.email?.message || '')
    }
    if (passwordRef.current) {
      passwordRef.current.setCustomValidity(fieldErrors?.password?.message || '')
    }
  }, [fieldErrors])

  const handleFormAction = (data: FormData) => {
    startTransition(() => {
      // Dispatch the async function within startTransition
      formAction(data)
    })
  }

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    handleFormAction(data)
  }

  return (
    <form className="mt-10 w-80" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-5">
        <SignInput name="email" type="text" placeholder="Email" register={register} ref={emailRef} />
        <SignInput
          name="password"
          type="password"
          placeholder="Create your password"
          register={register}
          ref={passwordRef}
        />
        <div className="grid gap-1 px-5">
          {validationRules.map((rule) => (
            <p className={rule.className} key={rule.id}>
              {rule.title}
            </p>
          ))}
        </div>
      </div>
      <div className="mt-10 flex w-full justify-around">
        <SignButton label={'Sign-up'} />
      </div>
      {actionState.message && (
        <div className="text-clario-red-300 mt-10 flex w-full justify-around px-5 text-center">
          {actionState.message}
        </div>
      )}
    </form>
  )
}
