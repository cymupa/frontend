import { describe, expect, it } from 'bun:test'
import { isApiError } from './index'

describe('isApiError tests', () => {
  it('should return true if message in obj', () => {
    const error = {
      message: 'Test'
    }

    expect(isApiError(error)).toBe(true)
  })

  // it('should resolve after 2000ms', async () => {
  //   const startTime = Date.now()
  //   await sleep(2000)
  //   const endTime = Date.now()
  //   const elapsedTime = endTime - startTime
  //
  //   expect(elapsedTime).toBeGreaterThan(1950)
  //   expect(elapsedTime).toBeLessThan(2050)
  // })
  //
  // it('should resolve after 0ms', async () => {
  //   const startTime = Date.now()
  //   await sleep(0)
  //   const endTime = Date.now()
  //   const elapsedTime = endTime - startTime
  //
  //   expect(elapsedTime).toBeLessThan(30)
  // })
})
