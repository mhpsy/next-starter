'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { locales } from '@/i18n/locales'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import { useParams } from 'next/navigation'
import { useTransition } from 'react'

interface Language {
  name: string
  code: string
}

const languageMap = {
  'zh-cn': '中文简体',
  'en': 'English',
}

const languageList: Language[] = locales.map(locale => ({
  code: locale,
  name: languageMap[locale as keyof typeof languageMap],
}))

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const params = useParams()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const currentLocale = useLocale()

  const switchLanguage = (locale: string) => {
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
      <Select onValueChange={switchLanguage} value={currentLocale}>
        <SelectTrigger className="w-26">
          <SelectValue>
            <div className="flex items-center">
              <span>{languageMap[currentLocale as keyof typeof languageMap]}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languageList.map(language => (
            <SelectItem
              key={language.code}
              value={language.code}
              disabled={isPending}
            >
              <span>{language.name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
