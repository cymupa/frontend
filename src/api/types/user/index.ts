export interface UserController {
  'user.show': {
    method: 'POST'
    req: { id: number }
    res: GetUserResponse
  }
  'user.get': {
    method: 'GET'
    req: {}
    res: GetUserResponse
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
