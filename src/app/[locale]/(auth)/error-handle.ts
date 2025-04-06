'use client'

import { isRedirectError } from '@/lib/error'
import { useState } from 'react'

export interface AuthError {
  type: string
  message: string
  code?: string
}

export interface AuthResponse {
  success: boolean
  error?: AuthError
  result?: any
}

// 用于处理认证错误的钩子
export function useAuthError() {
  const [authError, setAuthError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // 处理认证操作（登录或注册）
  const handleAuthAction = async <T>(
    action: () => Promise<AuthResponse>,
    onSuccess?: (result: any) => void,
  ) => {
    try {
      setIsLoading(true)
      setAuthError(null)
      const response = await action()

      if (response.success) {
        onSuccess?.(response.result)
        return { success: true, result: response.result }
      }
      else if (response.error) {
        setAuthError(response.error.message)
        return { success: false, error: response.error }
      }
      return { success: false }
    }
    catch (err: any) {
      if (isRedirectError(err)) {
        throw err
      }

      // 处理已知的错误类型
      if (err.type === 'CredentialsSignin') {
        return {
          success: false,
          error: {
            type: err.type,
            code: err.code || 'credentials',
            message: getAuthErrorMessage(err.code),
          },
        }
      }

      // 处理其他未知错误
      return {
        success: false,
        error: {
          type: 'UnknownError',
          message: err.message || 'unknown error',
        },
      }
    }
    finally {
      setIsLoading(false)
    }
  }

  return {
    authError,
    setAuthError,
    isLoading,
    setIsLoading,
    handleAuthAction,
  }
}

// 根据错误代码获取错误消息
export function getAuthErrorMessage(code: string): string {
  switch (code) {
    case 'dont_have_user':
      return 'dontHaveUser'
    case 'password_error':
      return 'passwordError'
    case 'input_error':
      return 'inputError'
    case 'username_exists':
      return 'usernameExists'
    case 'email_exists':
      return 'emailExists'
    default:
      return 'unknownError'
  }
}
