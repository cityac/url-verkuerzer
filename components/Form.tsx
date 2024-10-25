'use client'
'use client'

import { ChangeEvent, useActionState, useCallback, useEffect, useState } from 'react'
import { Input, Radio, RadioGroup } from '@mui/material'
import { createShortUrl, HomeFormState } from '@/actions/url'
import SubmitButton from './SubmitButton'
import { analyse } from '@/utils/ai'
import { useAutosave } from 'react-autosave'

const initState: HomeFormState = { longUrl: null, shortUrl: null, backHalf: null }

export const Form = () => {
  const [destination, setDestination] = useState('https://flexusflow.webflow.io/')
  const [title, setTitle] = useState('')
  const [customBackHalf, setCustomBackHalf] = useState('')
  const [aiBackHalf, setAiBackHalf] = useState('')
  // eslint-disable-next-line
  const [backHalfs, setBackHalfs] = useState<string[]>([])
  const [isSaving, setIsSaving] = useState(false)

  const [formState, formAction] = useActionState<HomeFormState>(createShortUrl, initState)
  useEffect(() => {
    if (formState.shortUrl) {
      setDestination('')
      setTitle('')
      setBackHalfs([])
    }
  }, [formState])

  useAutosave({
    data: destination,
    onSave: async (_url: string) => {
      console.log('ON SAVE')
      if (!_url) return
      setIsSaving(true)

      const data = await analyse(_url)

      if (data) {
        setBackHalfs(data.shortHashes)
        setTitle(data.subject)
      }
      setIsSaving(false)
    },
  })

  const handleCustomBackHalfChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setAiBackHalf('')
    setCustomBackHalf(e.target.value)
  }, [])

  const handleAiBackHalfChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCustomBackHalf('')
    setAiBackHalf(e.target.value)
  }, [])

  return (
    <form className="w-96 h-auto m-auto bg-content1 shadow-lg rounded-md p-3 flex flex-col gap-2">
      <label htmlFor="destination" className="text-sm text-gray-600">
        Destination
      </label>
      <Input
        className="border-2w-full  border-purple-200 active:border-purple-400 rounded-md  px-2"
        name="destination"
        required
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <label htmlFor="title" className="text-sm text-gray-600">
        Title(optional)
      </label>
      <Input
        className="w-full border-2 border-purple-200 active:border-purple-400 rounded-md"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {!!backHalfs.length && (
        <RadioGroup className="flex items-start" value={aiBackHalf || customBackHalf}>
          <span key="custom" className="w-full">
            <Radio color="primary" value={customBackHalf} name="customBackHalf" onChange={handleCustomBackHalfChange} />
            <Input
              className="w-[calc(100%-50px)]"
              value={customBackHalf}
              onChange={handleCustomBackHalfChange}
              placeholder="Custom back-half (optional)"
            />
          </span>
          Suggested back-half
          {backHalfs.map((custom) => (
            <span key={custom}>
              <Radio color="primary" value={custom} name="customBackHalf" onChange={handleAiBackHalfChange}></Radio>
              {custom}
            </span>
          ))}
        </RadioGroup>
      )}

      <SubmitButton label="Submit" formAction={formAction} isLoading={isSaving} />
      {formState.shortUrl && (
        <div>
          <a href={formState.shortUrl!} target="_blank">
            Your link {formState.shortUrl}
          </a>
        </div>
      )}
    </form>
  )
}
