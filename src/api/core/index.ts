import type { Ref, UnwrapRef } from 'vue'
import type {
  AuthController,
  CategoriesController,
  DynamicNewsController,
  DynamicProductsRouteKey,
  NewsController,
  ProductsController,
  UserController
} from '../types'

export type HttpMethod = 'GET' | 'POST'

/**
 * Типы для работы с сервером
 */

export type Api = UserController &
  AuthController &
  NewsController &
  ProductsController &
  DynamicProductsRouteKey &
  DynamicNewsController &
  CategoriesController

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

export interface State<R extends ApiRoutes, M extends HttpMethod> {
  isLoading: Ref<boolean>
  fetchData: (data: ApiRequest<R, M>, id?: string | number) => Promise<void>
  data: Ref<UnwrapRef<ApiResponseData<R, M>> | null>
  error: Ref<string | null>
}
