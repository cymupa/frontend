import type { ApiUser } from './user'

/**
 * Ответ сервера
 */
export interface ApiResponse<T> {
  data: T | null
  error: string | null
  isLoading: boolean
}

export type Api = ApiUser

// Какие роуты есть на сервере
export type ApiRoutes = keyof Api
// Что вернет сервер в ответ на определенный запрос
export type ApiResponseData<T extends keyof Api> = Api[T]['res']['data']
// Что надо передать серверу для определенного запроса
export type ApiRequest<T extends keyof Api> = Api[T]['req']
// Метод используемого запроса
export type ApiMethod<T extends keyof Api> = Api[T]['method']
