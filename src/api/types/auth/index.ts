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
    GET: {
      req: {}
      res: {}
    }
    POST: {
      req: AuthorizationRequest
      res: AuthResponse
    }
  }
  registration: {
    GET: {
      req: {}
      res: {}
    }
    POST: {
      req: RegistrationRequest
      res: AuthResponse
    }
  }
}

export interface AuthResponse {
  token: string
}

export interface AuthorizationRequest {
  tel: string
  password: string
}

export interface RegistrationRequest {
  name: string
  surname: string
  tel: string
  birth: string
  password: string
}
