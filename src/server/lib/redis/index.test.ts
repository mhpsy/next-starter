import { describe, expect, it } from 'vitest'
import { redis } from './index'

const testKey = '2025-04-06'
const testValue = '11:16:19'

describe('redis', () => {
  it('should be a Object', () => {
    expect(redis).toBeInstanceOf(Object)
  })

  it('redis set', async () => {
    const result = await redis.set(testKey, testValue)
    expect(result).toBe('OK')
  })

  it('redis get', async () => {
    const result = await redis.get(testKey)
    expect(result).toBe(testValue)
  })

  it('redis del', async () => {
    const result = await redis.del(testKey)
    expect(result).toBe(1)
  })
})
