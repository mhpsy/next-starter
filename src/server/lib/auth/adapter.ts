import type { admin_user } from '@prisma/client'
// 实现 nextauth 的适配器
// https://authjs.dev/reference/core/adapters#createauthenticator

import type { Adapter, AdapterAccount, AdapterSession, AdapterUser, VerificationToken } from 'next-auth/adapters'
import { log } from '@/server/lib/log'
import prisma from '@/server/lib/prisma'
import { redis } from '@/server/lib/redis'
import { tryit } from 'radash'
import { z } from 'zod'
// 创建Prisma客户端

const expiresIn = 60 * 60 * 24 * 14 // 14天

const VerificationTokenPrefix = 'verification_token:'
const AdminSessionPrefix = 'admin_session:'
// 用于OAuth登录之后暂存id
const OAuthIdPrefix = 'oauth_login_id:'

function convertToAdapterUser(user: admin_user | null): AdapterUser | null {
  if (!user) {
    return null
  }
  // 确保返回对象符合AdapterUser接口
  const tempUser: AdapterUser = {
    id: user.user_id.toString(),
    email: user.email,
    emailVerified: user.login_at || null,
    name: user.username,
    image: user.avatar || null,

    // 扩展字段
    username: user.username,
    avatar: user.avatar,
    phone: user.phone,
    timezone: user.timezone,
    user_type: user.user_type,
    sort: user.sort,
    status: user.status,
    delete_flag: user.delete_flag,
    created_at: user.created_at,
    updated_at: user.updated_at,

    // 可能为空的字段，转换为undefined
    ...(user.department_id !== null && { department_id: user.department_id }),
    ...(user.login_ip !== null && { login_ip: user.login_ip }),
    ...(user.login_at && { login_at: user.login_at }),
    ...(user.created_by_id !== null && { created_by_id: user.created_by_id }),
    ...(user.created_by_name !== null && { created_by_name: user.created_by_name }),
    ...(user.updated_by_id !== null && { updated_by_id: user.updated_by_id }),
    ...(user.updated_by_name !== null && { updated_by_name: user.updated_by_name }),
    ...(user.remark !== null && { remark: user.remark }),
  }
  return tempUser
}

// 获取用户
async function getUser(id: string): Promise<AdapterUser | null> {
  const result = await prisma.admin_user.findUnique({
    where: {
      user_id: Number(id),
    },
  })

  return convertToAdapterUser(result)
}

const userSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  email: z.string().min(1),
  image: z.string().min(1),
})

// 根据邮箱获取用户
async function getUserByEmail(email: string): Promise<AdapterUser | null> {
  const result = await prisma.admin_user.findUnique({
    where: {
      email,
    },
  })

  return convertToAdapterUser(result)
}

function myAdapter(): Adapter {
  return {
    getUser,
    getUserByEmail,
    // 创建验证令牌
    async createVerificationToken(
      verificationToken: VerificationToken,
    ): Promise<VerificationToken> {
      log.info('createVerificationToken', verificationToken)
      await redis.set(
        VerificationTokenPrefix + verificationToken.identifier,
        verificationToken.token,
        {
          // 设置过期时间
          EX: verificationToken.expires.getTime() - Date.now(),
        },
      )
      return verificationToken
    },

    // 使用验证令牌
    async useVerificationToken({
      identifier,
      token,
    }: {
      identifier: string
      token: string
    }): Promise<VerificationToken | null> {
      log.info('useVerificationToken', identifier, token)
      const result = await redis.get(VerificationTokenPrefix + identifier)
      if (result !== token) {
        return null
      }
      await redis.del(VerificationTokenPrefix + identifier)
      return { identifier, token, expires: new Date() }
    },

    // 创建用户
    // 如果是Credentials的话那么不会触发这里
    // 只有是 OAuth 或者是 email/无密码验证 的登录流程才会触发这里
    async createUser(user: AdapterUser): Promise<AdapterUser> {
      async function setOAuthId(userUUId: string, realUserId: string) {
        await redis.set(OAuthIdPrefix + userUUId, realUserId, {
          EX: 60 * 60 * 24 * 14, // 14天
        })
      }

      // 这里用邮箱有问题，因为可能是第三方未验证过的邮箱
      const hasUser = await getUserByEmail(user.email)
      if (hasUser) {
        await setOAuthId(user.id.toString(), hasUser.id.toString())
        return hasUser
      }

      const [error, userData] = tryit(userSchema.parse)(user)
      if (error) {
        log.error('auth adapter createUser userSchema.parse error', error)
        throw new Error('userSchema.parse error')
      }

      const result = await prisma.admin_user.create({
        data: {
          username: userData.name,
          email: userData.email,
          avatar: userData.image,
          password: '',
        },
      })

      await setOAuthId(user.id.toString(), result.user_id.toString())

      return convertToAdapterUser(result)!
    },

    // 根据 provider 和 providerAccountId 获取用户
    async getUserByAccount({
      providerAccountId,
      provider,
    }): Promise<AdapterUser | null> {
      const account = await prisma.admin_account.findFirst({
        where: {
          provider_account_id: providerAccountId,
          provider,
        },
        include: {
          user: true,
        },
      })
      log.info('getUserByAccount', account)
      return convertToAdapterUser(account?.user || null)
    },

    // 更新用户
    async updateUser(user: AdapterUser): Promise<AdapterUser> {
      const result = await prisma.admin_user.update({
        where: {
          user_id: Number(user.id),
        },
        data: {
          username: user.username,
          avatar: user.avatar,
          phone: user.phone,
          timezone: user.timezone,
        },
      })
      return convertToAdapterUser(result)!
    },

    // linkAccount
    async linkAccount(account: AdapterAccount): Promise<void> {
      log.warn('linkAccount', account)
      // const userId = await redis.get(OAuthIdPrefix + account.userId)
      // if (!userId) {
      //   throw new Error('user not found')
      // }
      await prisma.admin_account.create({
        data: {
          user_id: Number(account.userId),
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
          id_token: account.id_token,
          scope: account.scope,
          session_state: account.session_state?.toString() || null,
          token_type: account.token_type,
        },
      })
    },

    // create session

    async createSession({ sessionToken, userId, expires }) {
      if (userId === undefined) {
        throw new Error(`userId is undef in createSession`)
      }
      await redis.set(AdminSessionPrefix + sessionToken, userId, {
        EX: expires.getTime() - Date.now(),
      })
      return { sessionToken, userId, expires }
    },

    // getSessionAndUser
    async getSessionAndUser(sessionToken: string): Promise<{ session: AdapterSession, user: AdapterUser } | null> {
      log.info('getSessionAndUser', sessionToken)
      const userId = await redis.get(AdminSessionPrefix + sessionToken)
      if (!userId) {
        log.info('getSessionAndUser', 'userId not found')
        return null
      }
      log.info('getSessionAndUser', 'userId found', userId)
      const user = await getUser(userId)
      if (!user) {
        log.info('getSessionAndUser', 'user not found')
        return null
      }
      log.info('getSessionAndUser', 'user found', user)
      return { session: { sessionToken, userId, expires: new Date(Date.now() + expiresIn) }, user }
    },

    // updateSession
    async updateSession(session: AdapterSession): Promise<AdapterSession> {
      log.info('updateSession', session)
      // 在更新会话时，检查Redis中是否存在该会话
      const existingUserId = await redis.get(AdminSessionPrefix + session.sessionToken)
      if (!existingUserId) {
        log.warn('尝试更新不存在的会话', session.sessionToken)
      }
      else {
        // 更新会话的过期时间
        await redis.expire(AdminSessionPrefix + session.sessionToken, Math.floor((session.expires.getTime() - Date.now()) / 1000))
      }
      return session
    },

    // deleteSession
    async deleteSession(sessionToken: string): Promise<void> {
      await redis.del(AdminSessionPrefix + sessionToken)
    },

    // unlinkAccount
    async unlinkAccount(
      providerData: Pick<AdapterAccount, 'provider' | 'providerAccountId'>,
    ): Promise<void> {
      await prisma.admin_account.delete({
        where: {
          account_id: Number(providerData.providerAccountId),
        },
      })
    },

    // delete user
    async deleteUser(userId: string): Promise<void> {
      // 先删除用户关联的账户数据
      await prisma.admin_account.updateMany({
        where: {
          user_id: Number(userId),
        },
        data: {
          delete_flag: 1,
        },
      })

      // 再删除用户记录
      await prisma.admin_user.update({
        where: {
          user_id: Number(userId),
        },
        data: {
          delete_flag: 1,
        },
      })
    },
  }
}

export default myAdapter
