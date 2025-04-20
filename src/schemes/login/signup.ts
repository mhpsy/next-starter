import { z } from 'zod'

export const signupSchema = z.object({
  username: z.string()
    .min(5, 'usernameTooShort')
    .max(50, 'usernameTooLong'),
  email: z.string().email('invalidEmail'),
  password: z.string()
    .min(10, 'passwordTooShort')
    .max(50, 'passwordTooLong')
    .regex(/(?=.*[A-Z])/, { message: 'passwordMustHaveUppercase' })
    .regex(/(?=.*[a-z])/, { message: 'passwordMustHaveLowercase' })
    .regex(/(?=.*\d)/, { message: 'passwordMustHaveNumber' })
    .regex(/(?=.*[@$!%*?&])/, { message: 'passwordMustHaveSpecialCharacter' }),
  confirmPassword: z.string()
    .min(10, { message: 'passwordTooShort' })
    .max(50, { message: 'passwordTooLong' })
    .regex(/(?=.*[A-Z])/, { message: 'passwordMustHaveUppercase' })
    .regex(/(?=.*[a-z])/, { message: 'passwordMustHaveLowercase' })
    .regex(/(?=.*\d)/, { message: 'passwordMustHaveNumber' })
    .regex(/(?=.*[@$!%*?&])/, { message: 'passwordMustHaveSpecialCharacter' }),
  acceptTerms: z.boolean().refine(data => data, { message: 'acceptTerms' }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'passwordsDoNotMatch',
  path: ['confirmPassword'],
})

export type SignupSchema = z.infer<typeof signupSchema>
