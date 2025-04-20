import type { admin_user } from '@prisma/client'
import type { User } from 'next-auth'
import { AuthProviders } from '@/constants'
import { nullToUndefined } from '@/lib'
import log from '@/server/lib/log'
import { verifyPassword } from '@/server/lib/password'
import prisma from '@/server/lib/prisma'
import NextAuth, { CredentialsSignin } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import { omit } from 'radash'
import { v4 as uuidv4 } from 'uuid'
import myAdapter from './adapter'

class DontHaveUserError extends CredentialsSignin {
  code = 'dont_have_user'
}

class PasswordError extends CredentialsSignin {
  code = 'password_error'
}

class InputError extends CredentialsSignin {
  code = 'input_error'
}

const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: AuthProviders.UsernameOrEmail,
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        log.info('authorize', credentials)
        if (!credentials) {
          throw new InputError()
        }

        const { username, password } = credentials as { username: string, password: string }

        // email or username
        const users = await prisma.admin_user.findMany({
          where: {
            OR: [
              { username },
              { email: username },
            ],
          },
        })

        if (users.length === 0) {
          throw new DontHaveUserError()
        }

        let validUser: admin_user | null = null
        for (const user of users) {
          const isValid = await verifyPassword(password, user.password)
          if (isValid) {
            validUser = user
            log.info('validUser', validUser)
            // 转换为NextAuth期望的User类型，将null值转为undefined
            const userWithoutPassword = omit(validUser, ['password'])
            return nullToUndefined(userWithoutPassword) as User
          }
        }

        throw new PasswordError()
      },
    }),
  ],
  pages: {
    signIn: '/en/login',
  },
  session: {
    strategy: 'database',
    maxAge: 60 * 60 * 24 * 30, // 30 days max live time
    updateAge: 60 * 60 * 24, // 1 day update time
    generateSessionToken: () => {
      return uuidv4()
    },
  },
  adapter: myAdapter(),
  callbacks: {
    signIn({ user }) {
      log.info('signIn', user)
      // if return false, will dont sign in
      // Returning `false` or throwing an error will stop the sign-in flow and redirect the user to the error page.
      return true
    },
    redirect({ url, baseUrl }) {
      // url is client send redirect url
      // baseUrl is server base url
      log.info('redirect', url, baseUrl)
      // 如果是相对路径，拼接完整 URL
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      }
      // 如果是完整 URL 且与 baseUrl 同源，则直接返回
      if (url.startsWith(baseUrl)) {
        return url
      }
      // 否则返回主页
      return baseUrl
    },
    jwt({ token, user }) {
      log.info('jwt', token, user)
      // 首次登录时，user包含了authorize返回的所有信息
      if (user) {
        token.user = user
      }
      return token
    },
    session({ session, user }) {
      // session: { user: AdapterUser } & AdapterSession
      /** Available when is set to `strategy: "database"`. */
      // /user: AdapterUser
      log.info('session', session, user)
      // 如果token中有用户信息，则合并到session中
      if (user) {
        session.user = {
          ...session.user,
          ...user,
        }
      }
      return session
    },
  },
  // adapter
  debug: process.env.NODE_ENV === 'development',
})

export { auth, handlers, signIn, signOut }
