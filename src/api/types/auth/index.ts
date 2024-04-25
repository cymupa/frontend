/**
 * Типизация роутов для работы с авторизацией / регистрацией
 *
 * method - метод запроса
 * req - что передать серверу
 * res - что сервер вернет
 */
export interface AuthController {
  authorization: {
    method: 'POST'
    req: { login: string; password: string }
    res: AuthResponse
  }
  registration: {
    method: 'POST'
    req: { login: string; password: string }
    res: AuthResponse
  }
}

interface AuthResponse {
  data: { token: string }
}
