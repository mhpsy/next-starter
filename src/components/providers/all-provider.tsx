import type { AbstractIntlMessages } from 'next-intl'
import { ProgressBar, ProgressBarProvider } from '@/components/common/progress'
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
        <ProgressBarProvider>
          <ProgressBar className="fixed h-1 z-10 shadow-lg shadow-sky-500/20 bg-gray-500 top-0" />
          {children}
        </ProgressBarProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  )
}
