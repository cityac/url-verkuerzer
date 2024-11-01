import { AppUrl } from '@/utils/config'
import { delay } from '@/utils/delay'
import { getSimpleHash } from '@/utils/hash'
export type HomeFormState = {
  longUrl: string | null
  shortUrl: string | null
  backHalf: string | null
}

export const createShortUrl = async (currentState: HomeFormState, data: FormData) => {
  const destination = data.get('destination') as string
  const title = data.get('title') as string
  const backHalf = data.get('customBackHalf') as string

  console.log({ data })

  let hash: string
  if (backHalf) {
    hash = backHalf
  } else {
    // hash = await getSha256Hash(destination)
    hash = getSimpleHash(destination)
  }
  console.log({ hash, backHalf })

  await delay(500)
  return {
    shortUrl: `${AppUrl}/${hash}`,
  }
}
