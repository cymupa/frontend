import type { State } from '@/hooks'
import type { ApiRequest } from '../../core'

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
      req: { login: string; password: string; name: string }
      res: AuthResponse
    }
  }
}

interface AuthResponse {
  data: { token: string }
}
