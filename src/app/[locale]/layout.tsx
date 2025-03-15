import type { Metadata } from 'next'
import type { AbstractIntlMessages } from 'next-intl'
import LanguageSwitcher from '@/components/common/language-switcher'
import ThemesSwitcher from '@/components/common/themes-switcher'
import { AllProvider } from '@/components/providers/all-provider'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { getMessages } from 'next-intl/server'
import './globals.css'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  let messages: AbstractIntlMessages
  if (!routing.locales.includes(locale as any)) {
    // notFound()
    messages = await getMessages({ locale: 'en' })
  }
  else {
    messages = await getMessages({ locale })
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased">
        <AllProvider messages={messages}>

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
          <main className="mt-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </AllProvider>
      </body>
    </html>
  )
}
