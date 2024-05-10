import type { State } from '@/api/core'
import { useFetch } from '@/hooks'

interface AuthRequests {
  authorize(): State<'authorization', 'POST'>
  register(): State<'registration', 'POST'>
}

export const authApi: AuthRequests = {
  authorize: () => useFetch('authorization', 'POST'),
  register: () => useFetch('registration', 'POST')
}
