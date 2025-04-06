import { describe, it } from 'vitest'
import { log } from './index'

describe('log', () => {
  it('should log', () => {
    log.info('test', 'test')
  })
})
