import { addMethod, object, string, ValidationError } from 'yup'

import { AuthValidations, ValidationRule } from '@/models/authValidations'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

addMethod(string, 'password', function (args) {
  // return this.test("password", "validation.title", function(value) {
  //   const { path, createError } = this;

  //   // [value] - value of the property being tested
  //   // [path]  - property name,
  //   // ...
  //   return true;

  // });
  // var result: StringSchema<string | undefined, Maybe<AnyObject>, undefined, "">
  let result = this.test('password', 'Password is required', (value) => !value)

  const validations = args as ValidationRule[]
  return this.test('password', 'password', function (value) {
    const { path, createError } = this
    if (!value) {
      return createError({ message: 'Password is required' })
    }

    var validationPassed = true
    let error: ValidationError | undefined
    validations.forEach((validation) => {
      Object.entries<number>(validation.rules).forEach(([key, val]) => {
        console.log({ key, val, value, path })
        switch (key) {
          case 'digit':
            validationPassed = validationPassed && (value?.match(/\d/g) || []).length >= val
            break
          case 'uppercase':
            validationPassed = validationPassed && (value?.match(/[A-Z]/g) || []).length >= val
            break
          case 'lowercase':
            validationPassed = validationPassed && (value?.match(/[a-z]/g) || []).length >= val
            break
          case 'min':
            validationPassed = validationPassed && Number(value?.length) >= val
            break
          case 'max':
            validationPassed = validationPassed && Number(value?.length) <= val
            break
        }
        if (!validationPassed && !error) {
          error = createError({ message: validation.title })
        }
      })
    })
    if (error) return error

    return true
  })
})

export const useValidation = (value: AuthValidations | null) => {
  const validations = value || {}
  console.log({ validations })
  const validationSchema = object().shape({
    email: string().required('Email is required').email('Invalid email address'),
    password: string().password(validations['password'] || []),
    // .test('password', 'Password is required', (value => !value)
    // .test('password', 'Password is required', (value => !value)

    // .min(8, 'Password must be at least 8 characters'),
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(validationSchema),
  })

  return { register, handleSubmit, formState }
}
