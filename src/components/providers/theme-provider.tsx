'use client'

import type { ComponentProps } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      {...props}
      enableSystem
      disableTransitionOnChange
      storageKey="theme"
      cookiePrefix="theme-"
      cookie={{
        name: 'theme',
        options: {
          path: '/',
          maxAge: 365 * 24 * 60 * 60,
        },
      }}
    >
      {children}
    </NextThemesProvider>
  )
}
