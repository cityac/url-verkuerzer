'use client'
import { signout } from '@/actions/signout'
import { UrlForm } from '@/components/UrlForm'

const DashboardPage = () => {
  return (
    <>
      <UrlForm />
      <button onClick={() => signout()}>Logout</button>
    </>
  )
}
export default DashboardPage
