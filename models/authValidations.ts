export type PasswordRuleKey = 'digit' | 'uppercase' | 'lowercase' | 'min' | 'max'
export type Field = 'email' | 'password'

export type AuthValidations = {
  email: ValidationRule[]
  password: ValidationRule[]
}

export type ValidationRule = {
  id: string
  title: string
  rules: Record<PasswordRuleKey, number>
}
