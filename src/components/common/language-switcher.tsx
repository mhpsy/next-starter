'use client'

import { locales } from '@/i18n/locales'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import { useParams } from 'next/navigation'
import { useState, useTransition } from 'react'

interface Language {
  name: string
  code: string
}

const languageMap = {
  'zh-cn': '中文简体',
  'en': 'english',
}

const languageList: Language[] = locales.map(locale => ({
  code: locale,
  name: languageMap[locale as keyof typeof languageMap],
}))

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const params = useParams()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const currentLocale = useLocale()

  const switchLanguage = (locale: string) => {
    setIsOpen(false)

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale },
      )
    })
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
        type="button"
      >
        <span>{languageMap[currentLocale as keyof typeof languageMap]}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {languageList.map(language => (
              <button
                key={language.code}
                type="button"
                onClick={() => switchLanguage(language.code)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center ${currentLocale === language.code ? 'bg-gray-50 dark:bg-gray-700' : ''
                }`}
                role="menuitem"
                disabled={isPending}
              >
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
