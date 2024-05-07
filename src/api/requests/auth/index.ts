import type { ApiRequest } from '@/api/core'
import { type State, useFetch } from '@/hooks'

interface AuthRequests {
  authorize(): State<'authorization', 'POST'>
  register(): State<'registration', 'POST'>
}

export const authApi: AuthRequests = {
  authorize: () => useFetch('authorization', 'POST'),
  register: () => useFetch('registration', 'POST')
}
