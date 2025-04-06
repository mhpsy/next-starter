// types/next-auth.d.ts
import type { DefaultUser } from 'next-auth'

// if you want to add more fields to the user
interface IUser extends DefaultUser {
  phone?: string | null
  avatar?: string | null
}
declare module 'next-auth' {
  interface User extends IUser {}
  interface Session {
    user?: User
  }
}
declare module 'next-auth/jwt' {
  interface JWT extends IUser {}
}
