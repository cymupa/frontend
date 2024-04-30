/**
 * Определяет вернулась ли ошибка с сервера
 */
export const isApiError = <T extends object>(obj: T) =>
  Boolean(obj && 'message' in obj)
