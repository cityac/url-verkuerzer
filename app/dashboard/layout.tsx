const DashboardLayout = ({ children }) => {
  return (
    <div className="container w-screen h-screen flex justify-center items-center m-auto">
      <div className="w-full max-w-[400px]">{children}</div>
    </div>
  )
}

export default DashboardLayout
