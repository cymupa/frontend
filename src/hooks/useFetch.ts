import { type Ref, ref, type UnwrapRef } from 'vue'
import { AxiosError, type AxiosRequestConfig } from 'axios'
import type { ApiMethod, ApiRequest, ApiResponseData, ApiRoutes } from '@/api/types'

import api from '../api'

interface State<Route extends ApiRoutes> {
  isLoading: Ref<UnwrapRef<boolean>>
  fetchData: () => Promise<void>
  data: Ref<UnwrapRef<ApiResponseData<Route> | null>>
  error: Ref<UnwrapRef<string | null>>
}

/**
 * Хук useFetch позволяет взаимодействовать с сервером
 * Благодаря строгой типизации каждый роут и принимаемые параметры подсказываются,
 * а также то, что вернет сервер в ответе
 */
export const useFetch = <Route extends ApiRoutes>(
  url: Route,
  method: ApiMethod<Route>,
  data?: ApiRequest<Route>,
): State<Route> => {
  const dataRes = ref<null | ApiResponseData<Route>>(null)
  const error = ref<string | null>(null)
  const isLoading = ref(true)

  const fetchData = async () => {
    isLoading.value = true
    try {
      const requestConfig: AxiosRequestConfig = {
        method,
        url,
        data,
      }

      const res = await api.request<ApiResponseData<Route>>(requestConfig)

      dataRes.value = res.data as UnwrapRef<ApiResponseData<Route>>

      error.value = null
    } catch (err) {
      const axiosError = err as AxiosError
      error.value = axiosError.message || 'Fetch error'
      throw axiosError
    } finally {
      isLoading.value = false
    }
  }

  return { data: dataRes, error, isLoading, fetchData }
}
