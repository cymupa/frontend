import type { ApiRequest } from '@/api/core'
import type { State } from '@/hooks'

export interface UserController {
  users: {
    GET: {
      req: { id: number }
      res: GetUserResponse
    }
    POST: {
      req: {}
      res: GetUserResponse
    }
  }
}

interface GetUserResponse {
  data: {
    firstName: string
    lastName: string
    patronymic?: string
    age: Date
  }
}

export interface UserRequests {
  getById(req: ApiRequest<'users', 'POST'>): State<'users', 'POST'>
  getAll(req: ApiRequest<'users', 'GET'>): State<'users', 'GET'>
}
