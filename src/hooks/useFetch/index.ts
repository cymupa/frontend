import type { AxiosError, AxiosRequestConfig } from 'axios'
import { type Ref, type UnwrapRef, ref } from 'vue'

import type {
  ApiRequest,
  ApiResponseData,
  ApiRoutes,
  HttpMethod
} from '@/api/core'

import { sleep } from '@/utils'

import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import api from '../../api'

export interface State<R extends ApiRoutes, M extends HttpMethod> {
  isLoading: Ref<UnwrapRef<boolean>>
  fetchData: () => Promise<void>
  data: Ref<UnwrapRef<ApiResponseData<R, M> | null>>
  error: Ref<UnwrapRef<string | null>>
}

/**
 * Хук useFetch позволяет взаимодействовать с сервером
 * Благодаря строгой типизации каждый роут и принимаемые параметры подсказываются,
 * а также то, что вернет сервер в ответе
 */
export const useFetch = <R extends ApiRoutes, M extends HttpMethod>(
  url: R,
  method: M,
  data: ApiRequest<R, M>
): State<R, M> => {
  const { token } = storeToRefs(useAuthStore())
  console.log('[API] Receive data: ', data)

  const dataRes = ref<null | ApiResponseData<R, M>>(null)
  const error = ref<string | null>(null)
  const isLoading = ref(false)

  const fetchData = async () => {
    isLoading.value = true
    try {
      const requestConfig: AxiosRequestConfig = {
        method,
        url,
        data
      }

      await sleep(1000)
      const res = await api.request<ApiResponseData<R, M>>({
        ...requestConfig,
        headers: {
          Authorization: `Bearer ${
            token.value ?? localStorage.getItem('token')
          }`
        }
      })

      dataRes.value = res.data as UnwrapRef<ApiResponseData<R, M>>

      console.log('[API] Response: ', dataRes.value)

      error.value = null
    } catch (err) {
      const axiosError = err as AxiosError
      error.value = axiosError.message || 'Fetch error'

      console.log('[API] Error: ', axiosError.message)

      throw axiosError
    } finally {
      isLoading.value = false
    }
  }

  return { data: dataRes, error, isLoading, fetchData }
}
