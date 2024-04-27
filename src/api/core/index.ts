import type { UserController } from '../types'
import type { AuthController } from '../types'

export type HttpMethod = 'GET' | 'POST'

/**
 * Типы для работы с сервером
 */

export type Api = UserController & AuthController

export type ApiRoutes = keyof Api

// Что вернет сервер в ответ на определенный запрос
export type ApiResponseData<
  Route extends keyof Api,
  Method extends HttpMethod
> = Api[Route][Method]['res']

// Что надо передать серверу для определенного запроса
export type ApiRequest<
  Route extends keyof Api,
  Method extends HttpMethod
> = Api[Route][Method]['req']
