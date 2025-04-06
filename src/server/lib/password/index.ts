// import bcrypt from 'bcrypt'
import bcrypt from 'bcryptjs'

export async function getHashedPassword(password: string) {
  return await bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword)
}
