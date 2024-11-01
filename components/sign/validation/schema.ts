import { addMethod, string } from 'yup'

import { ValidationRule } from '@/models/authValidations'
import { CustomFieldErrors } from '@/models/uiValidations'
import { useEffect, useState } from 'react'
import { FormState } from 'react-hook-form'

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

export const useValidation = (formState: FormState<{ password: string; email: string }>): CustomFieldErrors => {
  const [errors, setErrors] = useState<CustomFieldErrors>({})

  useEffect(() => {
    const updatedErrors: CustomFieldErrors = {}
    Object.entries(formState.errors).forEach(([key, value]) => {
      updatedErrors[key] = {
        ...value,
        type: value.type as string,
        violatedRuleIds: value.message?.split('|') || [],
      }
    })
    const hasErrorsChanged =
      Object.keys(errors).length !== Object.keys(updatedErrors).length ||
      Object.entries(updatedErrors).some(([key, newValue]) => {
        const oldValue = errors[key]
        return oldValue?.message !== newValue.message || oldValue?.type !== newValue.type
      })

    if (hasErrorsChanged) {
      setErrors(updatedErrors)
    }
  }, [formState.errors])

  return errors
}
