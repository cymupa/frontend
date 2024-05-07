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
}

export type GetUserInfoResponse = [User]
