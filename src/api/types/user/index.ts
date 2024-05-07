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
      req: { id: string } & Partial<Omit<User, 'id'>>
      res: User
    }
  }
}

export type GetUserInfoResponse = [User]
