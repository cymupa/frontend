/**
 * Определяет вернулась ли ошибка с сервера
 */
import type { AxiosError } from 'axios'

export interface ValidationError {
  [fieldName: string]: string[]
}

export interface ApiError {
  message: string
  errors: ValidationError
}

export const isApiError = (obj: unknown): obj is AxiosError<ApiError, any> =>
  Boolean(
    obj &&
      typeof obj === 'object' &&
      'message' in obj &&
      'response' in obj &&
      typeof obj?.response === 'object' &&
      obj?.response &&
      'data' in obj?.response
  )









