import type { ApiRequest } from '@/api/core'
import { type State, useFetch } from '@/hooks'

interface UserRequests {
  getById(req: ApiRequest<'users', 'GET'>): State<'users', 'GET'>
  getAll(req: ApiRequest<'users', 'POST'>): State<'users', 'POST'>
}

export const userApi: UserRequests = {
  getAll: (req) => useFetch('users', 'POST', req),
  getById: (req) => useFetch('users', 'GET', req)
}
