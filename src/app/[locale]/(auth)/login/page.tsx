'use client'

import { Link } from '@/components/common/link'
import { FormInput } from '@/components/from/form-input'
import { Button } from '@/components/ui/button'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function LoginPage() {
  const t = useTranslations('Auth')
  const formSchema = z.object({
    username: z.string()
      .min(5, { message: t('usernameTooShort', { min: 5 }) })
      .max(50, { message: t('usernameTooLong', { max: 50 }) }),
    password: z.string()
      .min(10, { message: t('passwordTooShort', { min: 10 }) })
      .max(50, { message: t('passwordTooLong', { max: 50 }) })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/, { message: t('passwordTooWeak') }),
  })

  type FormoSchema = z.infer<typeof formSchema>

  const form = useForm<FormoSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  function onSubmit(data: FormoSchema) {
    console.warn(data)
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
            >
              {t('logIn')}
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
