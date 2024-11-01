import { ButtonProps } from '@nextui-org/react'
import { ComponentPropsWithoutRef } from 'react'
import { RefCallBack, UseFormRegister } from 'react-hook-form'

export type SignInputProps = ComponentPropsWithoutRef<'input'> &
  Partial<Pick<HTMLInputElement, 'type' | 'placeholder' | 'required'>> &
  Pick<HTMLInputElement, 'name'> & {
    type: string
    register: UseFormRegister<{
      email: string
      password: string
    }>

    ref?: RefCallBack
  }

export type SignButtonProps = { label: string } & ButtonProps
