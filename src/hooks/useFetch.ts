import { reactive, type ToRefs, toRefs, type UnwrapNestedRefs, type UnwrapRef } from 'vue'
import { AxiosError, type AxiosRequestConfig } from 'axios'
import type { ApiMethod, ApiRequest, ApiResponse, ApiResponseData, ApiRoutes } from '@/api/types'

import api from '../api'

interface State<T extends ApiRoutes> {
  data: ApiResponseData<T> | null
  error: string | null
  isLoading: boolean
}

export const useFetch = async <T extends ApiRoutes>(
  url: T,
  method: ApiMethod<T>,
  data?: ApiRequest<T>,
): Promise<ToRefs<UnwrapNestedRefs<State<T>>>> => {
  const state = reactive<State<T>>({
    data: null,
    error: null,
    isLoading: false,
  })

  const fetchData = async () => {
    state.isLoading = true
    try {
      const requestConfig: AxiosRequestConfig = {
        method,
        url,
        data,
      }
      const res = await api.request<ApiResponseData<T>>(requestConfig)

      if (typeof res.data !== 'undefined') {
        state.data = res.data as UnwrapRef<ApiResponseData<T>> | null
      }

      state.error = null
    } catch (err) {
      const axiosError = err as AxiosError
      state.error = axiosError.message || 'Fetch error'
    } finally {
      state.isLoading = false
    }
  }

  fetchData()
  return toRefs(state)
}
