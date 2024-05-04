/**
 * Типизация роутов для работы с авторизацией / регистрацией
 *
 * первый ключ - url адрес
 * второй ключ - метод запроса
 * req - что передать серверу
 * res - что сервер вернет
 */
export interface AuthController {
  authorization: {
    POST: {
      req: { login: string; password: string }
      res: AuthResponse
    }
  }
  registration: {
    POST: {
      req: RegistrationRequest
      res: AuthResponse
    }
  }
}

export interface AuthResponse {
  data: { token: string }
}

export interface RegistrationRequest {
  name: string
  surname: string
  tel: string
  birth: string
  password: string
  avatar: File
}
