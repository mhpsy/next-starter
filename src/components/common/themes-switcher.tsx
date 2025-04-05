'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface Theme {
  name: string
  value: string
  icon: React.ElementType
}

export default function ThemesSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const tc = useTranslations('Common')

  const themeList: Theme[] = [
    {
      name: tc('light'),
      value: 'light',
      icon: SunIcon,
    },
    {
      name: tc('dark'),
      value: 'dark',
      icon: MoonIcon,
    },
    {
      name: tc('system'),
      value: 'system',
      icon: ComputerDesktopIcon,
    },
  ]

  // 在组件挂载后再渲染，避免水合不匹配
  useEffect(() => {
    setMounted(true)
  }, [])

  const Icon = ComputerDesktopIcon

  if (!mounted) {
    return (
      <div className="relative">
        <Select disabled value="system">
          <SelectTrigger>
            <SelectValue>
              <div className="flex items-center">
                <Icon className="h-5 w-5" />
              </div>
            </SelectValue>
          </SelectTrigger>
        </Select>
      </div>
    )
  }

  const currentTheme = themeList.find(t => t.value === theme) || themeList[0]
  const CurrentIcon = currentTheme.icon

  const switchTheme = (themeValue: string) => {
    setTheme(themeValue)
  }

  return (
    <div className="relative">
      <Select onValueChange={switchTheme} value={currentTheme.value}>
        <SelectTrigger>
          <SelectValue asChild>
            <CurrentIcon className="h-5 w-5" />
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {themeList.map((themeOption) => {
            const Icon = themeOption.icon
            return (
              <SelectItem key={themeOption.value} value={themeOption.value}>
                <Icon className="h-5 w-5 mr-2" />
                <span>{themeOption.name}</span>
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}
