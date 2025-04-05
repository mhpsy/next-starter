import type { Metadata } from 'next'
import type { AbstractIntlMessages } from 'next-intl'
import { AllProvider } from '@/components/providers/all-provider'
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
      <body className="antialiased" suppressHydrationWarning>
        <AllProvider messages={messages}>
          {children}
        </AllProvider>
      </body>
    </html>
  )
}
