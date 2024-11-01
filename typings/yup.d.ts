import 'yup'

declare module 'yup' {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext = AnyObject,
    TDefault = undefined,
    TFlags extends Flags = '',
  > extends Schema<TType, TContext, TDefault, TFlags> {
    password(args: ValidationRule[]): StringSchema<NonNullable<TType>, TContext, TDefault, TFlags>
  }
}
