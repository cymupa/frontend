import type { AuthController } from './auth'
import type { UserController } from './user'

/**
 * Типы для работы с сервером
 */

export type Api = AuthController & UserController

// Какие роуты есть на сервере
export type ApiRoutes = keyof Api
// Что вернет сервер в ответ на определенный запрос
export type ApiResponseData<T extends ApiRoutes> = Api[T]['res']['data']
// Что надо передать серверу для определенного запроса
export type ApiRequest<T extends ApiRoutes> = Api[T]['req']
// Метод используемого запроса
export type ApiMethod<T extends ApiRoutes> = Api[T]['method']
