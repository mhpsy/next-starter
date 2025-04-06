import { log } from '@/server/lib/log'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: '用户名', type: 'text' },
        password: { label: '密码', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        // 这里只是示例，打印账号密码
        log('登录尝试', {
          username: credentials.username,
          password: credentials.password,
        })

        // 简单的登录逻辑，实际应用中应该从数据库验证
        return {
          id: '1',
          name: credentials.username,
          email: `${credentials.username}@example.com`,
        }
      },
    }),
  ],
  pages: {
    signIn: '/en/login',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      log('signIn', { user, account, profile })
      return true
    },
    async jwt({ token, user }) {
      // 如果有用户数据，将其添加到 token 中
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      // 将 token 中的数据添加到 session 中
      if (token && session.user) {
        session.user = {
          ...session.user,
          id: token.id as string,
        }
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
