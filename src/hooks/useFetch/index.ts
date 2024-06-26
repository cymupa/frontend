import type { AxiosError, AxiosRequestConfig } from 'axios'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import type {
  ApiRequest,
  ApiResponseData,
  ApiRoutes,
  HttpMethod,
  State
} from '@/api/core'

import { useAuthStore } from '@/stores/auth'
import { sleep } from '@/utils'

import api from '../../api'

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

  const dataRes = ref<ApiResponseData<R, M>>()
  const error = ref<string | null>(null)
  const isLoading = ref(false)

  const fetchData = async (data?: ApiRequest<R, M>, id?: string | number) => {
    isLoading.value = true
    error.value = ''

    const u = String(url)
    const currentRoute = id ? `${u}/${id}` : u

    try {
      await sleep(1000)
      const headers = {
        Authorization: `Bearer ${token.value ?? localStorage.getItem('token')}`
      }
      if (typeof data === 'object' && data && 'avatar' in data) {
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
        ).data
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
