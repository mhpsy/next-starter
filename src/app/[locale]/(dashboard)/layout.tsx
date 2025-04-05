import LanguageSwitcher from '@/components/common/language-switcher'
import ThemesSwitcher from '@/components/common/themes-switcher'
import { Button } from '@/components/ui/button'
import { Link } from '@/components/common/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <nav className="flex gap-4 justify-between m-4" aria-label="Main Navigation">
        <div className="w-full flex items-center gap-4">
          <Button variant="link" asChild>
            <Link href="/" className="text-2xl">
              <span className="icon-[ic--baseline-home]"></span>
              {' '}
              Home
            </Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="/about" className="text-2xl">
              <span className="icon-[ic--baseline-calendar-today]"></span>
              {' '}
              About
            </Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="/blog" className="text-2xl">
              <span className="icon-[ic--baseline-newspaper]"></span>
              {' '}
              Blog
            </Link>
          </Button>
        </div>
        <div className="flex gap-4">
          <LanguageSwitcher />
          <ThemesSwitcher />
        </div>
      </nav>
      <main>
        {children}
      </main>
    </>
  )
}
