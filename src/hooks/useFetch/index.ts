import type { AxiosError, AxiosRequestConfig } from 'axios'
import { storeToRefs } from 'pinia'
import { type Ref, type UnwrapRef, ref } from 'vue'

import type {
  ApiRequest,
  ApiResponseData,
  ApiRoutes,
  HttpMethod
} from '@/api/core'

import { API_URL } from '@/config/env'
import { useAuthStore } from '@/stores/auth'
import { sleep } from '@/utils'
import axios from 'axios'
import api from '../../api'

export interface State<R extends ApiRoutes, M extends HttpMethod> {
  isLoading: Ref<boolean>
  fetchData: (data: ApiRequest<R, M>, id?: string | number) => Promise<void>
  data: Ref<UnwrapRef<ApiResponseData<R, M>> | null>
  error: Ref<string | null>
}

/**
 * Хук useFetch позволяет взаимодействовать с сервером
 * Благодаря строгой типизации каждый роут и принимаемые параметры подсказываются,
 * а также то, что вернет сервер в ответе
 */
export const useFetch = <R extends ApiRoutes, M extends HttpMethod>(
  url: R,
  method: M
): State<R, M> => {
  const { token } = storeToRefs(useAuthStore())

  const dataRes = ref<ApiResponseData<R, M> | null>(null)
  const error = ref<string | null>(null)
  const isLoading = ref(false)

  const fetchData = async (data?: ApiRequest<R, M>, id?: string | number) => {
    isLoading.value = true
    const u = String(url)
    const currentRoute = id ? `${u}/${id}` : u
    try {
      await sleep(1000)
      const headers = {
        Authorization: `Bearer ${token.value ?? localStorage.getItem('token')}`
      }
      if (data && 'avatar' in data) {
        dataRes.value = (
          await api.postForm(currentRoute, data, {
            headers
          })
        ).data
      } else {
        const requestConfig: AxiosRequestConfig = {
          method,
          url: currentRoute,
          data,
          headers
        }

        dataRes.value = (
          await api.request<ApiResponseData<R, M>>(requestConfig)
        ).data as UnwrapRef<ApiResponseData<R, M>>
      }

      error.value = null
    } catch (err) {
      const axiosError = err as AxiosError
      error.value = axiosError.message || 'Fetch error'
      console.warn('[API] Error: ', axiosError)
      throw axiosError
    } finally {
      isLoading.value = false
    }
  }

  return { data: dataRes, error, isLoading, fetchData }
}
