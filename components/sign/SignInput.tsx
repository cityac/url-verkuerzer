'use client'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'

type Props = Partial<Pick<HTMLInputElement, 'type' | 'placeholder' | 'required'>> & { type: string }

export const SignInput = ({ type, ...btnProps }: Props) => {
  const [inputType, setInputType] = useState('text')

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
        <input type={inputType} className="sign-input" {...btnProps} />
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
}
