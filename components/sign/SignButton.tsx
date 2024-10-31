'use client'
import { Button, ButtonProps } from '@nextui-org/react'
import { useFormStatus } from 'react-dom'

type Props = { label: string } & ButtonProps
const SignButton = ({ label, ...btnProps }: Props) => {
  const { pending } = useFormStatus()
  return (
    <Button className="sign-button" {...btnProps} type="submit" isLoading={pending}>
      {label}
    </Button>
  )
}

export default SignButton
