import type { User } from '@/types/User'

export type DynamicUsersRouteKey = `users/${string}`

export interface UserController {
  me: {
    GET: {
      req: {}
      res: GetUserInfoResponse
    }
    POST: {
      req: {}
      res: {}
    }
  }
}

export interface DynamicUserController {
  [key: string]: {
    GET: {
      req: {}
      res: {}
    }
    POST: {
      req: UpdateUserRequest
      res: User
    }
  }
}

export type UpdateUserRequest = Partial<User>

export type GetUserInfoResponse = [User]
