/**
 * Типизация роутов для работы с юзером
 *
 * method - метод запроса
 * req - что передать серверу
 * res - что сервер вернет
 */
export interface ApiUser {
  authorization: {
    method: 'POST'
    req: { login: string; password: string }
    res: { data: { token: string } }
  }
  registration: {
    method: 'POST'
    req: { login: string; password: string }
    res: { data: { token: string } }
  }
}
