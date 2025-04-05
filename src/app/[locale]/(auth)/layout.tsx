import { Link } from '@/components/common/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="flex flex-col items-center justify-center h-screen">
        <div className="p-4 border border-gray-200 rounded-lg shadow-md">
          {children}
        </div>
      </main>

      <footer className="text-center text-sm text-gray-500 fixed bottom-10 w-full">
        <Link href="/">to home</Link>
      </footer>
    </>
  )
}
