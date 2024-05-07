import { describe, expect, it } from 'bun:test'

import { formatDate } from './index'

describe('formatDate tests', () => {
  it('should return formatted date for string input', () => {
    const dateString = 'Tue May 07 2024 17:20:09 GMT+0700 (GMT+07:00)'
    const expected = '2024-05-07'
    const result = formatDate(dateString)
    expect(result).toBe(expected)
  })
})
