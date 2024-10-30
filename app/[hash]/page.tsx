import { redirect } from 'next/navigation'

type Props = { params: { hash: string } }
const ShortUrlPage = async (props: Props) => {
  const data = await props.params
  redirect('https://flexusflow.webflow.io/blog')
  return null
}

export default ShortUrlPage
