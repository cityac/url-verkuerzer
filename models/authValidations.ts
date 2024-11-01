import { GlobalError } from 'react-hook-form'

export type PasswordRuleKey = 'digit' | 'uppercase' | 'lowercase' | 'min' | 'max'
export type Field = 'email' | 'password'

export type ValidationRule = {
  id: string
  title: string
  rules: Record<PasswordRuleKey, number>
}

export type AuthValidations = {
  email: ValidationRule[]
  password: ValidationRule[]
}
export type UIValidationRule = Pick<ValidationRule, 'id' | 'title'> & {
  className: string
}

type Key = keyof AuthValidations

export type Errors = {
  [x: string]: ErrorField
}
export type ErrorField = GlobalError & {
  violatedRuleIds: string[]
}
