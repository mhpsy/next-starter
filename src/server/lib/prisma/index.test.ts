import { describe, expect, it } from 'vitest'
import prisma from './index'

describe('prisma', () => {
  it('prisma should be a defined', () => {
    expect(prisma).toBeDefined()
    expect(typeof prisma.$connect).toBe('function')
    expect(typeof prisma.$disconnect).toBe('function')
  })

  it('prisma show db list', async () => {
    const result = await prisma.$queryRaw`SELECT datname FROM pg_database WHERE datistemplate = false;` as any[]
    expect(result.length).toBeGreaterThan(1)
  })
})
