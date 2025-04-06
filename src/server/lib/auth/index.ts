import log from '@/server/lib/log'
import { verifyPassword } from '@/server/lib/password'
import prisma from '@/server/lib/prisma'
import NextAuth, { CredentialsSignin } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { omit } from 'radash'

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
    CredentialsProvider({
      name: 'Credentials',
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

        let validUser: any = null
        for (const user of users) {
          const isValid = await verifyPassword(password, user.password)
          if (isValid) {
            validUser = user
            log.info('validUser', validUser)
            return omit(validUser, ['password'])
          }
        }

        throw new PasswordError()
      },
    }),
  ],
  pages: {
    signIn: '/en/login',
  },
  // session: {
  //   // strategy: 'jwt'|'database',
  //   maxAge: 60 * 60 * 24 * 30, // 30 days max live time
  //   updateAge: 60 * 60 * 24, // 1 day update time
  //   generateSessionToken: () => {
  //     return uuidv4()
  //   },
  // },
  // adapter: PrismaAdapter(prisma),
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
    session({ session, token }) {
      log.info('session', session, token)
      // 如果token中有用户信息，则合并到session中
      if (token.user) {
        session.user = {
          ...session.user,
          ...token.user,
        }
      }
      return session
    },
  },
  // adapter
  debug: process.env.NODE_ENV === 'development',
})

export { auth, handlers, signIn, signOut }
