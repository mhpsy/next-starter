import type { AbstractIntlMessages } from 'next-intl'
import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from './theme-provider'

export function AllProvider({
  children,
  messages,
}: {
  children: React.ReactNode
  messages: AbstractIntlMessages
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </ThemeProvider>
  )
}
