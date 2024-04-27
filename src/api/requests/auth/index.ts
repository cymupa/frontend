import type { ApiRequest } from '@/api/core'
import { type State, useFetch } from '@/hooks'

export interface AuthRequests {
  authorize(
    req: ApiRequest<'authorization', 'POST'>
  ): State<'authorization', 'POST'>
  register(
    req: ApiRequest<'registration', 'POST'>
  ): State<'registration', 'POST'>
}

export const authApi: AuthRequests = {
  authorize: (req) => useFetch('authorization', 'POST', req),
  register: (req) => useFetch('registration', 'POST', req)
}
