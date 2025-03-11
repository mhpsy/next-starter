import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import { routing } from './i18n/routing'

// 创建国际化中间件
const intlMiddleware = createIntlMiddleware(routing)

// 这个中间件在每个请求上运行
export default function middleware(request: NextRequest) {
  // 首先处理国际化
  const response = intlMiddleware(request)

  // 如果 URL 包含主题切换参数，设置主题 cookie
  const { searchParams } = new URL(request.url)
  const theme = searchParams.get('theme')

  if (theme) {
    // 如果有主题参数，设置主题 cookie
    response.cookies.set({
      name: 'theme',
      value: theme,
      // 设置 cookie 有效期为一年
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    })
  }

  return response
}

// 配置中间件匹配的路径
export const config = {
  // 匹配国际化路径
  matcher: ['/', `/(en|zh-cn)/:path*`],
}
