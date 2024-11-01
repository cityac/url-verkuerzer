export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="container flex h-[100vh] flex-col items-center bg-gradient-to-tl from-clario-linen-blue to-clario-alice-blue pt-[94px]">
      {children}
    </div>
  )
}
