import type { User } from '@/types/User'

export interface UserController {
  me: {
    GET: {
      req: {}
      res: GetUserInfoResponse
    }
  }
}

export type GetUserInfoResponse = [User]
