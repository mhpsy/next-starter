'use client'

import type { SignupSchema } from '@/lib/schemes/signup'
import { Link } from '@/components/common/link'
import { FormCheckbox } from '@/components/from/form-checkbox'
import { FormInput } from '@/components/from/form-input'
import { Button } from '@/components/ui/button'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
} from '@/components/ui/form'
import { SWR_KEY } from '@/constants/swr-key'
import { signupSchema } from '@/lib/schemes/signup'
import { signup } from '@/server/api/auth/signup'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import useSWRMutation from 'swr/mutation'

export default function RegisterPage() {
  const t = useTranslations('Auth')
  const formSchema = signupSchema

  const form = useForm<SignupSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  })

  const { trigger, isMutating } = useSWRMutation(
    SWR_KEY.AUTH.SIGNUP,
    async (_key, { arg }: { arg: SignupSchema }) => {
      return await signup(arg)
    },
  )

  async function onSubmit(data: SignupSchema) {
    console.warn(data)
    const result = await trigger(data)
    console.warn(result)
    if (result?.ok) {
      toast.success(t('signupSuccess'))
    }
    else if (result?.error) {
      toast.error(`${t('signupError')}: ${result.error}`)
    }
  }

  function setValue() {
    const randomUsername = `user${Math.floor(Math.random() * 10000)}${Date.now().toString().slice(-4)}`
    const randomEmail = `test${Math.floor(Math.random() * 1000)}@example.com`
    const randomPassword = `Test${Math.floor(Math.random() * 1000)}@${Math.floor(Math.random() * 10000)}`

    form.setValue('username', randomUsername)
    form.setValue('email', randomEmail)
    form.setValue('password', randomPassword)
    form.setValue('confirmPassword', randomPassword)
    form.setValue('acceptTerms', true)

    // 触发表单验证
    Object.keys(form.getValues()).forEach((key) => {
      form.trigger(key as keyof SignupSchema)
    })

    toast.success(t('formFilledForDebug'))
  }

  return (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">{t('signUp')}</CardTitle>
        <CardDescription className="text-center">
          {t('createAccount')}
          {
            process.env.NODE_ENV === 'development' && (
              <Button onClick={setValue}>{t('fillForm')}</Button>
            )
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormInput
              control={form.control}
              name="username"
              label={t('username')}
              placeholder={t('usernamePlaceholder')}
              description={t('usernameDescription')}
              t={t}
              tv={{ min: 5, max: 50 }}
            />
            <FormInput
              control={form.control}
              name="email"
              label={t('email')}
              type="email"
              placeholder={t('emailPlaceholder')}
              description={t('emailDescription')}
              t={t}
              tv={{ min: 5, max: 50 }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                control={form.control}
                name="password"
                label={t('password')}
                type="password"
                placeholder="••••••••••"
                t={t}
                tv={{ min: 10, max: 50 }}
              />
              <FormInput
                control={form.control}
                name="confirmPassword"
                label={t('confirmPassword')}
                type="password"
                placeholder="••••••••••"
                t={t}
                tv={{ min: 10, max: 50 }}
              />
            </div>
            <FormCheckbox
              control={form.control}
              name="acceptTerms"
              label={t('acceptTermsLabel')}
              t={t}
            />
            <Button
              type="submit"
              className="w-full transition-all py-2 text-base font-medium hover:shadow-md"
              disabled={isMutating}
            >
              {isMutating ? t('signing') : t('signUp')}
            </Button>
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                {t('alreadyHaveAccount')}
                <Link href="/login" className="ml-1 text-primary hover:underline">
                  {t('toSignIn')}
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </>
  )
}
