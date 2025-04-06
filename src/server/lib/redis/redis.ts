import env from '@/server/env'
import { createClient } from 'redis'

const redis = createClient({
  url: `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`,
  password: env.REDIS_PASSWORD,
})

redis.connect()

export default redis
