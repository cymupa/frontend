import type { ApiRequest } from '@/api/core'
import { type State, useFetch } from '@/hooks'

interface UserRequests {
  getUserInfo(req?: ApiRequest<'me', 'GET'>): State<'me', 'GET'>
}

export const userApi: UserRequests = {
  getUserInfo: (req) => useFetch('me', 'GET', req)
}
