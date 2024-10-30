import { PropsWithChildren } from 'react'

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="container m-auto flex h-screen w-screen items-center justify-center">
      <div className="w-full max-w-[400px]">{children}</div>
    </div>
  )
}

export default DashboardLayout
