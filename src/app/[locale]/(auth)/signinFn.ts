'use server'

import { isRedirectError } from '@/lib/error'
import { signIn } from '@/server/lib/auth'
import { getLocale } from 'next-intl/server'

interface SignInType {
  credentials: 'github' | 'username_or_email'
  username?: string
  password?: string
  redirectTo?: string
}

export async function signinFn(
  data: SignInType,
) {
  const locale = await getLocale()
  if (process.env.NODE_ENV === 'development') {
    console.warn('locale', locale)
  }

  try {
    const result = await signIn(data.credentials, {
      redirectTo: data.redirectTo || `/${locale}`,
      ...data,
    })
    return { success: true, result }
  }
  catch (error: any) {
    if (isRedirectError(error)) {
      throw error
    }
    // 处理已知的错误类型
    if (error.type === 'CredentialsSignin') {
      return {
        success: false,
        error: {
          type: error.type,
          code: error.code || 'credentials',
          message: getErrorMessage(error.code),
        },
      }
    }

    // 处理其他未知错误
    return {
      success: false,
      error: {
        type: 'UnknownError',
        message: error.message || 'unknown error',
      },
    }
  }
}

// 根据错误代码返回对应的错误消息
function getErrorMessage(code: string): string {
  switch (code) {
    case 'dont_have_user':
      return 'dontHaveUser'
    case 'password_error':
      return 'passwordError'
    case 'input_error':
      return 'inputError'
    default:
      return 'unknownError'
  }
}
