import { NOOP } from '@/utils/constants'
import { FieldError, FormState, GlobalError, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import { ObjectSchema } from 'yup'
import { AnyObject, ValidationRule } from './authValidations'

export type PasswordRuleKey = 'digit' | 'uppercase' | 'lowercase' | 'min' | 'max'
export type Field = 'email' | 'password'

export type UIValidationRule = Pick<ValidationRule, 'id' | 'title'> & {
  className: string
}

export type FormData = {
  password: string
  email: string
}

export type Errors = {
  [x: string]: ErrorField
}
export type ErrorField = GlobalError & {
  violatedRuleIds: string[]
}

type CustomFieldError = FieldError & {
  violatedRuleIds: string[]
}

export type CustomFieldErrors = {
  [x: string]: CustomFieldError
}

export type ValidationState = {
  register: UseFormRegister<FormData> | NOOP
  handleSubmit: UseFormHandleSubmit<FormData, undefined> | undefined
  formState: FormState<FormData>
  errors: CustomFieldErrors
}

export type ValidationSchema = ObjectSchema<
  FormData,
  AnyObject,
  {
    email: undefined
    password: undefined
  },
  ''
>
