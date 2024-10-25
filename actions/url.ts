import { AppUrl } from '@/utils/config'
import { delay } from '@/utils/delay'
import { getSha256Hash } from '@/utils/hash'
export type HomeFormState = {
  longUrl: string | null
  shortUrl: string | null
  backHalf: string | null
}

export const createShortUrl = async (currentState: HomeFormState, data: FormData) => {
  const longUrl = data.get('destination') as string
  const title = data.get('title') as string
  const backHalf = data.get('customBackHalf') as string

  let hash: string
  if (backHalf) {
    hash = backHalf
  } else {
    hash = await getSha256Hash(longUrl)
  }
  console.log({ hash, backHalf })

  await delay(500)
  return {
    shortUrl: `${AppUrl}/${hash}`,
  }
}
