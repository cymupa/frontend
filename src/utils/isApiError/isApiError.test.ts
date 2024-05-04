import { describe, expect, it } from 'bun:test'
import { type ApiError, type ValidationError, isApiError } from './index'

describe('isApiError tests', () => {
  it('should return false if message is missing', () => {
    const error = {}

    expect(isApiError(error)).toBe(false)
  })

  it('should return false if response is missing', () => {
    const error = {
      message: 'Test',
      response: undefined
    }

    expect(isApiError(error)).toBe(false)
  })

  it('should return false if response.data is missing', () => {
    const error = {
      message: 'Test',
      response: {}
    }

    expect(isApiError(error)).toBe(false)
  })

  it('should return true if all conditions are met', () => {
    const validationErrors: ValidationError = {
      tel: ['Invalid phone number'],
      password: ['Password must be at least 8 characters long']
    }

    const apiError: ApiError = {
      message: 'Validation error',
      errors: validationErrors
    }

    const axiosError = {
      message: 'Request failed',
      response: {
        data: apiError
      }
    }

    expect(isApiError(axiosError)).toBe(true)
  })
})
