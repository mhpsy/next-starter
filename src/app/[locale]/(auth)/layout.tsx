import LanguageSwitcher from '@/components/common/language-switcher'
import { Link } from '@/components/common/link'
import ThemesSwitcher from '@/components/common/themes-switcher'
import { Card } from '@/components/ui/card'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="flex flex-col items-center justify-center h-screen">
        <div className="flex w-full items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
          <Card className="w-full max-w-[90%] sm:max-w-[450px] md:max-w-[500px] shadow-lg">
            {children}
          </Card>
        </div>
      </main>

      <div className="flex gap-4 fixed top-4 right-4">
        <LanguageSwitcher />
        <ThemesSwitcher />
      </div>

      <footer className="text-center text-sm text-gray-500 fixed bottom-10 w-full">
        <Link href="/">to home</Link>
      </footer>
    </>
  )
}
