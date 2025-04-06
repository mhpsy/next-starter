import * as process from 'node:process'

const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_PASSWORD_SALT: process.env.DATABASE_PASSWORD_SALT,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  AUTH_SECRET: process.env.AUTH_SECRET,
}

export default env
