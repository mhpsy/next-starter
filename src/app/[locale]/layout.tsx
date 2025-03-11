import type { Metadata } from 'next'
import type { AbstractIntlMessages } from 'next-intl'
import LanguageSwitcher from '@/components/common/language-switcher'
import ThemesSwitcher from '@/components/common/themes-switcher'
import { AllProvider } from '@/components/providers/all-provider'
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
          <div>
            <nav className="flex gap-4" aria-label="Main Navigation">
              <span className="icon-[solar--alarm-sleep-broken]"></span>
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/blog">Blog</Link>
              <LanguageSwitcher />
              <ThemesSwitcher />
            </nav>
            <main className="mt-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </AllProvider>
      </body>
    </html>
  )
}
