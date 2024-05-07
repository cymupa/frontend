import type { ApiRequest } from '@/api/core'
import type { DynamicUsersRouteKey } from '@/api/types'
import { type State, useFetch } from '@/hooks'

interface UserRequests {
  getUserInfo(req?: ApiRequest<'me', 'GET'>): State<'me', 'GET'>
  updateUserInfo(
    req: ApiRequest<DynamicUsersRouteKey, 'POST'>
  ): State<DynamicUsersRouteKey, 'POST'>
}

export const userApi: UserRequests = {
  getUserInfo: (req) => useFetch('me', 'GET', req),
  updateUserInfo: (req) => useFetch(`users/${req.id}`, 'POST', req)
}
