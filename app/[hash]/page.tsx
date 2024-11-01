import { redirect } from 'next/navigation'

type Props = { params: Promise<{ hash: string }> }
const ShortUrlPage = async (props: Props) => {
  const data = await props.params
  console.log({ data })
  redirect('https://bit.ly')
  return null
}

export default ShortUrlPage
