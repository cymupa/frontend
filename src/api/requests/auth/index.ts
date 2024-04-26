import type { ApiRequest } from '@/api'
import { type State, useFetch } from '@/hooks'
import type { AuthRequests } from '../../types/auth'

export const authAPI: AuthRequests = {
  authorize(req: ApiRequest<'authorization'>): State<'authorization'> {
    return useFetch('authorization', 'POST', req)
  },

  register(req: ApiRequest<'registration'>): State<'registration'> {
    return useFetch('registration', 'POST', req)
  }
}
