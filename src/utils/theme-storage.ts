'use client'

import { getCookie, setCookie } from './cookies'

const THEME_COOKIE_NAME = 'theme'

// 自定义主题存储，使用 cookies 而不是 localStorage
export const cookieThemeStorage = {
  get: () => getCookie(THEME_COOKIE_NAME),
  set: (theme: string) => {
    setCookie(THEME_COOKIE_NAME, theme)
    // 触发存储事件，以便其他组件可以响应主题变化
    const event = new StorageEvent('storage', {
      key: THEME_COOKIE_NAME,
      newValue: theme,
    })
    window.dispatchEvent(event)
  },
}
