import { signIn } from '@/server/lib/auth'

// const login = createServerAction(async (loginInput: any) => {
//   try {
//     const result = await signIn('credentials', loginInput)
//     return result
//   }
//   catch (error: any) {
//     // 如果是重定向错误，则视为成功登录
//     if (error?.digest?.startsWith('NEXT_REDIRECT')) {
//       return { success: true, redirectUrl: error.digest.split(';')[2] }
//     }
//     // 其他错误则正常抛出
//     throw error
//   }
// })

// const login = signIn

export {
  signIn,
}

// export default login
