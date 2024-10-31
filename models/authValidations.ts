export type PasswordRuleKey = 'digit' | 'uppercase' | 'lowercase' | 'min' | 'max'

export type ValidationRule = {
  title: string
  rules: Record<PasswordRuleKey, number>
}

export type AuthValidations = Record<string, ValidationRule[]>
