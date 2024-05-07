import type { User } from '@/types/User'

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
  users: {
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
