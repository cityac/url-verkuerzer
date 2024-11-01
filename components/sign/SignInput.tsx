'use client'
import Image from 'next/image'
import {
  ComponentPropsWithoutRef,
  forwardRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { RefCallBack, UseFormRegister } from 'react-hook-form'

type Props = ComponentPropsWithoutRef<'input'> &
  Partial<Pick<HTMLInputElement, 'type' | 'placeholder' | 'required'>> &
  Pick<HTMLInputElement, 'name'> & {
    type: string
    register: UseFormRegister<{
      email: string
      password: string
    }>
    ref?: RefCallBack
  }

// eslint-disable-next-line react/display-name
export const SignInput = forwardRef<HTMLInputElement, Props>(
  ({ type, name, register, ...inputProps }, forwardedRef) => {
    const [inputType, setInputType] = useState('text')

    const { ref, ...rest } = register(name as 'email' | 'password')

    useEffect(() => {
      setInputType(type)
    }, [type])

    const showHideHandler = useCallback(() => {
      setInputType((prev) => (prev === 'password' ? 'text' : 'password'))
    }, [])

    const isPassword = useMemo(() => type === 'password', [type])
    return (
      <div>
        <div className="relative">
          <input
            type={inputType}
            className="sign-input"
            {...inputProps}
            {...rest}
            ref={(e: HTMLInputElement) => {
              ref(e)
              const f = forwardedRef as MutableRefObject<HTMLInputElement>
              f.current = e
            }}
          />
          {isPassword && (
            <button
              type="button"
              className="absolute inset-y-0 end-0 z-20 flex cursor-pointer items-center rounded-e-md px-3 text-gray-400 focus:text-blue-600 focus:outline-none"
              onClick={showHideHandler}
            >
              <Image src="/eye.svg" alt="Picture of the author" width={24} height={24} />
            </button>
          )}
        </div>
      </div>
    )
  },
)
