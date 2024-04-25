import type { NavigationGuardNext, RouteLocationNormalized as T } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useAuthStore } from '../../stores/auth.ts'

/**
 * Функция принимает параметры от vue и смотрит, куда передвигается юзер

 * В зависимости от того, авторизирован он или нет, мы либо совершаем переход, либо переводим на регистрацию
 * При этом пользователь без токена также не сможет попасть на страницы Forbidden (403) и NotFound (404)
 */
export const checkAuth = (to: T, _from: T, next: NavigationGuardNext): void => {
  const { token } = storeToRefs(useAuthStore())

  const isToLogin = to.name === 'login'
  const isToRegister = to.name === 'register'

  /**
   * Запрещаем ходить по сайту на авторизированным пользователяи
   */
  // if (!(isToLogin || isToRegister) && !token.value) {
  //   return next({ name: 'register' })
  // }

  next()
}
