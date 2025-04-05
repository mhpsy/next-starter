'use server'

import { log } from '@/server/lib/log'

/**
 * register
 * @param req
 * @returns
 */
export async function signup({
  email,
  password,
  username,
  acceptTerms,
}: {
  email: string
  password: string
  username: string
  acceptTerms: boolean
}) {
  if (!email || !password || !username || !acceptTerms) {
    return {
      error: 'Invalid input',
    }
  }

  log('register', { email, password, username, acceptTerms })

  return {
    success: true,
  }
}
