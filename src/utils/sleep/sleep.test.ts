import { describe, expect, it } from 'bun:test'
import { sleep } from './index'

describe('sleep tests', () => {
  it('should resolve after 1000ms', async () => {
    const startTime = Date.now()
    await sleep(1000)
    const endTime = Date.now()
    const elapsedTime = endTime - startTime

    expect(elapsedTime).toBeGreaterThan(950)
    expect(elapsedTime).toBeLessThan(1050)
  })

  it('should resolve after 2000ms', async () => {
    const startTime = Date.now()
    await sleep(2000)
    const endTime = Date.now()
    const elapsedTime = endTime - startTime

    expect(elapsedTime).toBeGreaterThan(1950)
    expect(elapsedTime).toBeLessThan(2050)
  })

  it('should resolve after 0ms', async () => {
    const startTime = Date.now()
    await sleep(0)
    const endTime = Date.now()
    const elapsedTime = endTime - startTime

    expect(elapsedTime).toBeLessThan(30)
  })
})
