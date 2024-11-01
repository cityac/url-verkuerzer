'use client'
import { Button } from '@nextui-org/react'
import { useFormStatus } from 'react-dom'
import { SignButtonProps } from './types'

const SignButton = ({ label, ...btnProps }: SignButtonProps) => {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="sign-button" {...btnProps} isLoading={pending}>
      {label}
    </Button>
  )
}

export default SignButton
