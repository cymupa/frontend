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
