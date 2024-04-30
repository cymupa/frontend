/**
 * Определяет вернулась ли ошибка с сервера
 */
export const isApiError = <T extends object>(obj: T) => {
  return Boolean(obj && 'message' in obj)
}
