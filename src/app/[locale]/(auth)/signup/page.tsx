'use client'

import { Link } from '@/components/common/link'
import { FormCheckbox } from '@/components/from/form-checkbox'
import { FormInput } from '@/components/from/form-input'
import { Button } from '@/components/ui/button'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
} from '@/components/ui/form'
import { signup } from '@/server/api/auth/signup'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function RegisterPage() {
  const t = useTranslations('Auth')
  const formSchema = z.object({
    username: z.string()
      .min(5, { message: t('usernameTooShort', { min: 5 }) })
      .max(50, { message: t('usernameTooLong', { max: 50 }) }),
    email: z.string().email({ message: t('invalidEmail') }),
    password: z.string()
      .min(10, { message: t('passwordTooShort', { min: 10 }) })
      .max(50, { message: t('passwordTooLong', { max: 50 }) })
      .regex(/(?=.*[A-Z])/, { message: t('passwordMustHaveUppercase') })
      .regex(/(?=.*[a-z])/, { message: t('passwordMustHaveLowercase') })
      .regex(/(?=.*\d)/, { message: t('passwordMustHaveNumber') })
      .regex(/(?=.*[@$!%*?&])/, { message: t('passwordMustHaveSpecialCharacter') }),
    confirmPassword: z.string()
      .min(10, { message: t('passwordTooShort', { min: 10 }) })
      .max(50, { message: t('passwordTooLong', { max: 50 }) })
      .regex(/(?=.*[A-Z])/, { message: t('passwordMustHaveUppercase') })
      .regex(/(?=.*[a-z])/, { message: t('passwordMustHaveLowercase') })
      .regex(/(?=.*\d)/, { message: t('passwordMustHaveNumber') })
      .regex(/(?=.*[@$!%*?&])/, { message: t('passwordMustHaveSpecialCharacter') }),
    acceptTerms: z.boolean().refine(data => data, { message: t('acceptTerms') }),
  }).refine(data => data.password === data.confirmPassword, {
    message: t('passwordsDoNotMatch'),
    path: ['confirmPassword'],
  })

  type FormoSchema = z.infer<typeof formSchema>

  const form = useForm<FormoSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  })

  async function onSubmit(data: FormoSchema) {
    console.warn(form)
    console.warn(data)
    const res = await signup(data)
    console.warn(res)
  }

  return (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">{t('signUp')}</CardTitle>
        <CardDescription className="text-center">
          {t('createAccount')}
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
            />
            <FormInput
              control={form.control}
              name="email"
              label={t('email')}
              type="email"
              placeholder={t('emailPlaceholder')}
              description={t('emailDescription')}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                control={form.control}
                name="password"
                label={t('password')}
                type="password"
                placeholder="••••••••••"
              />
              <FormInput
                control={form.control}
                name="confirmPassword"
                label={t('confirmPassword')}
                type="password"
                placeholder="••••••••••"
              />
            </div>
            <FormCheckbox
              control={form.control}
              name="acceptTerms"
              label={t('acceptTermsLabel')}
            />
            <Button
              type="submit"
              className="w-full transition-all py-2 text-base font-medium hover:shadow-md"
            >
              {t('signUp')}
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
