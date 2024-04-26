import type { ApiRequest } from '@/api'
import { type State, useFetch } from '@/hooks'
import type { AuthRequests } from '../../types/auth'

// export class AuthAPI implements AuthRequests {
//   async authorize(req: ApiRequest<'authorization'>): Promise<State<'authorization'>> {
//     return useFetch('authorization', 'POST', req)
//   }
//
//   async register(req: ApiRequest<'registration'>): Promise<State<'registration'>> {
//     return useFetch('registration', 'POST', req)
//   }
// }

export const authAPI: AuthRequests = {
  authorize(req: ApiRequest<'authorization'>): State<'authorization'> {
    return useFetch('authorization', 'POST', req)
  },

  register(req: ApiRequest<'registration'>): State<'registration'> {
    return useFetch('registration', 'POST', req)
  }
}
