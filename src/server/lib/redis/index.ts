import redis from './redis'

function redisSet(key: string, value: string) {
  redis.set(key, value)
}

function redisGet(key: string) {
  return redis.get(key)
}

export { redis, redisGet, redisSet }
