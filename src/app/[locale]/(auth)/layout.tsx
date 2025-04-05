export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <header>
        <h1>Auth Layout</h1>
      </header>
      {children}
    </div>
  )
}
