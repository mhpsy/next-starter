'use client'

import { Link } from '@/components/common/link'
import { FormInput } from '@/components/from/form-input'
import { Button } from '@/components/ui/button'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function LoginPage() {
  const t = useTranslations('Auth')
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const formSchema = z.object({
    username: z.string().min(1, { message: t('usernameRequired') }),
    password: z.string().min(1, { message: t('passwordRequired') }),
  })

  type FormoSchema = z.infer<typeof formSchema>

  const form = useForm<FormoSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  async function onSubmit(data: FormoSchema) {
    try {
      setLoading(true)
      setError(null)

      const result = await signIn('credentials', {
        username: data.username,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error || t('loginFailed'))
        console.error('登录失败:', result.error)
      }
      else {
        // 登录成功，跳转到主页或其他页面
        router.push('/dashboard')
      }
    }
    catch (error) {
      setError(t('loginError'))
      console.error('登录过程中出错:', error)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">{t('logIn')}</CardTitle>
        <CardDescription className="text-center">
          {t('signInToYourAccount')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <FormInput
              control={form.control}
              name="username"
              label={t('username')}
              placeholder={t('usernamePlaceholder')}
            />
            <FormInput
              control={form.control}
              name="password"
              label={t('password')}
              type="password"
              placeholder={t('passwordPlaceholder')}
            />
            <Button
              type="submit"
              className="w-full transition-all py-2 text-base font-medium hover:shadow-md"
              disabled={loading}
            >
              {loading ? t('loggingIn') : t('logIn')}
            </Button>
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                {t('dontHaveAccount')}
                <Link href="/signup" className="ml-1 text-primary hover:underline">
                  {t('toSignUp')}
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </>
  )
}
