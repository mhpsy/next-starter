'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Theme {
  name: string
  value: string
  icon: React.ElementType
}

const themeList: Theme[] = [
  {
    name: '浅色',
    value: 'light',
    icon: SunIcon,
  },
  {
    name: '深色',
    value: 'dark',
    icon: MoonIcon,
  },
  {
    name: '系统',
    value: 'system',
    icon: ComputerDesktopIcon,
  },
]

export default function ThemesSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  // 在组件挂载后再渲染，避免水合不匹配
  useEffect(() => {
    setMounted(true)

    // 从 cookie 中读取主题
    const themeCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('theme='))
      ?.split('=')[1]

    // 如果 cookie 中有主题设置，使用它
    if (themeCookie && themeCookie !== theme) {
      setTheme(themeCookie)
    }
  }, [setTheme, theme])

  if (!mounted) {
    return null
  }

  const currentTheme = themeList.find(t => t.value === theme) || themeList[0]
  const CurrentIcon = currentTheme.icon

  const switchTheme = (themeValue: string) => {
    // 设置主题
    setTheme(themeValue)

    // 通过 URL 参数设置主题，这将触发中间件设置 cookie
    router.push(`${pathname}?theme=${themeValue}`)
  }

  return (
    <div className="relative">
      <Select onValueChange={switchTheme}>
        <SelectTrigger>
          <SelectValue>
            <div className="flex items-center">
              <CurrentIcon className="h-5 w-5" />
              <span className="ml-2">{currentTheme.name}</span>
            </div>
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
