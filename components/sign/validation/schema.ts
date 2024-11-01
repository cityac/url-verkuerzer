import { addMethod, object, string } from 'yup'

import { AuthValidations, ValidationRule } from '@/models/authValidations'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldError, useForm } from 'react-hook-form'

addMethod(string, 'password', function (args) {
  const validations = args as ValidationRule[]
  return this.test('password', 'password', function (value) {
    const { createError } = this
    if (!value) {
      return createError({ message: 'Password is required' })
    }

    const violatedRuleIds: string[] = []
    validations.forEach((validation) => {
      Object.entries<number>(validation.rules).forEach(([key, val]) => {
        switch (key) {
          case 'digit':
            if ((value?.match(/\d/g) || []).length < val) {
              violatedRuleIds.push(validation.id)
            }
            break
          case 'uppercase':
            if ((value?.match(/[A-Z]/g) || []).length < val) {
              violatedRuleIds.push(validation.id)
            }
            break
          case 'lowercase':
            if ((value?.match(/[a-z]/g) || []).length < val) {
              violatedRuleIds.push(validation.id)
            }
            break
          case 'min':
            if (Number(value?.length) < val) {
              violatedRuleIds.push(validation.id)
            }
            break
          case 'max':
            if (Number(value?.length) > val) {
              violatedRuleIds.push(validation.id)
            }
            break
        }
      })
    })
    if (violatedRuleIds.length > 0) return createError({ message: violatedRuleIds.join('|') })

    return true
  })
})

export const useValidation = (value: AuthValidations | null) => {
  const validations = value || ({} as AuthValidations)
  const validationSchema = object().shape({
    email: string().required('Email is required').email('Invalid email address'),
    password: string().password(validations.password || []),
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const errors: {
    [x: string]: CustomFieldError
  } = {}

  Object.entries(formState.errors).forEach(([key, value]) => {
    errors[key] = {
      ...value,
      type: value.type as string,
      violatedRuleIds: value.message?.split('|') || [],
    }
    Object.assign(value, { violatedRuleIds: value.message?.split('|') })
  })

  return { register, handleSubmit, formState, errors }
}

type CustomFieldError = FieldError & {
  violatedRuleIds: string[]
}
