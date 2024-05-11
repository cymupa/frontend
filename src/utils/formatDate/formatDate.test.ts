import { describe, expect, it } from 'bun:test'

import { formatDate } from './index'

describe('formatDate tests', () => {
  it('should return formatted date for string input', () => {
    const dateString = 'Tue May 07 2024 17:20:09 GMT+0700 (GMT+07:00)'
    const expected = '2024-05-07'
    const result = formatDate(dateString)
    expect(result).toBe(expected)
  })

  it('should return formatted date for Date object input', () => {
    const dateObject = new Date('2024-05-07T17:20:09Z')
    const expected = '2024-05-07'
    const result = formatDate(dateObject)
    expect(result).toBe(expected)
  })

  it('should return formatted date for different time zone input', () => {
    const dateString =
      'Tue May 07 2024 05:20:09 GMT-0700 (Pacific Daylight Time)'
    const expected = '2024-05-07'
    const result = formatDate(dateString)
    expect(result).toBe(expected)
  })

  it('should return formatted date for leap year input', () => {
    const dateString = 'Tue Feb 29 2024 12:00:00 GMT+0000 (GMT)'
    const expected = '2024-02-29'
    const result = formatDate(dateString)
    expect(result).toBe(expected)
  })

  it('should return formatted date for single digit month and day input', () => {
    const dateString = 'Tue Apr 03 2024 12:00:00 GMT+0000 (GMT)'
    const expected = '2024-04-03'
    const result = formatDate(dateString)
    expect(result).toBe(expected)
  })
})
