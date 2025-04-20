'use client'

import { Link } from '@/components/common/link'
import { FormInput } from '@/components/from/form-input'
import { Alert, AlertDescription } from '@/components/ui/alert'

import { Button } from '@/components/ui/button'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { use } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAuthError } from '../error-handle'
import { signinFn } from '../signinFn'

export default function LoginPage(
  {
    searchParams,
  }: {
    searchParams: Promise<{ callbackUrl: string | undefined }>
  },
) {
  const t = useTranslations('Auth')
  const { callbackUrl } = use(searchParams)

  const {
    handleAuthAction,
    authError,
    isLoading,
  } = useAuthError()

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

  function setForm() {
    form.setValue('username', 'user47257399')
    form.setValue('password', 'Test454@7694')
    form.trigger()
  }

  return (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {t('logIn')}
        </CardTitle>
        <CardDescription className="text-center">
          {t('signInToYourAccount')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {process.env.NODE_ENV === 'development' && (
          <Button onClick={() => setForm()}>
            setForm
          </Button>
        )}
        {authError && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>
              <div className="flex items-center gap-2">
                <span className="icon-[material-symbols--warning-outline-rounded]" style={{ width: '16px', height: '16px' }}></span>
                {t(authError)}
              </div>
            </AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (data) => {
              try {
                const response = await handleAuthAction(async () => {
                  return await signinFn({
                    credentials: 'username_or_email',
                    username: data.username,
                    password: data.password,
                    redirectTo: callbackUrl,
                  })
                })
              }
              catch (err) {
                // do nothing
              }
            })}
            className="space-y-6"
          >
            <FormInput
              control={form.control}
              name="username"
              label={t('username')}
              placeholder={t('usernamePlaceholder')}
              disabled={isLoading}
            />
            <FormInput
              control={form.control}
              name="password"
              label={t('password')}
              type="password"
              placeholder={t('passwordPlaceholder')}
              disabled={isLoading}
            />
            <Button
              type="submit"
              className="w-full transition-all py-2 text-base font-medium hover:shadow-md"
              disabled={isLoading}
            >
              {isLoading ? t('loggingIn') : t('logIn')}
            </Button>
            <Button
              className="w-full transition-all py-2 text-base font-medium hover:shadow-md"
              variant="outline"
              disabled={isLoading}
              onClick={() => {
                handleAuthAction(async () => {
                  return await signinFn({
                    credentials: 'github',
                    redirectTo: callbackUrl,
                  })
                })
              }}
            >
              <span className="icon-[mdi--github]"></span>
              <span className="ml-2">
                {t('signInWithGithub')}
              </span>
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
