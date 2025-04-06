'use server'

import type { SignupSchema } from '@/lib/schemes/signup'
import { signupSchema } from '@/lib/schemes/signup'
import { createServerAction } from '@/server/lib/action'
import { getHashedPassword } from '@/server/lib/password'
import prisma from '@/server/lib/prisma'
import { omit } from 'radash'
/**
 * register
 * @param req
 * @returns
 */
export const signup = createServerAction(async (signupInput: SignupSchema) => {
  const signupData = signupSchema.parse(signupInput)
  const { username, email, password } = signupData

  // check if user already exists by username or email
  const [userByName, userByEmail] = await Promise.all([
    prisma.admin_user.findUnique({ where: { username } }),
    prisma.admin_user.findUnique({ where: { email } }),
  ])

  // if user already exists, return register failed
  if (userByName || userByEmail) {
    throw new Error(userByName ? 'username already exists' : 'email already exists')
  }

  // create user
  // bcrypt password
  const user = await prisma.admin_user.create({
    data: {
      username,
      email,
      password: await getHashedPassword(password),
    },
  })

  return {
    success: true,
    user: omit(user, ['password']),
  }
}, {
  message: 'signup success',
  errorMessage: 'signup error',
})
