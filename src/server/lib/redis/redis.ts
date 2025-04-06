import { createClient } from 'redis'
import '@/server/env/index'

const redis = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
})

redis.connect()

export default redis
