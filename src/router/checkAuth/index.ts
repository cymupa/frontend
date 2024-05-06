import { storeToRefs } from 'pinia'
import type {
  NavigationGuardNext,
  RouteLocationNormalized as T
} from 'vue-router'

import { useAuthStore } from '@/stores/auth'

/**
 * Функция принимает параметры от vue и смотрит куда передвигается юзер

 * В зависимости от того, авторизирован он или нет, мы либо совершаем переход, либо переводим на регистрацию
 * При этом пользователь без токена также не сможет попасть на страницы Forbidden (403) и NotFound (404)
 */
export const checkAuth = (to: T, _from: T, next: NavigationGuardNext): void => {
  const { token } = storeToRefs(useAuthStore())

  const allowedPath = [
    'login',
    'team',
    'news',
    'home',
    'teams',
    'register',
    'forbidden',
    'not-found',
    'tournament',
    'tournaments'
  ]

  /**
   * Запрещаем ходить по сайту на авторизированным пользователяи
   */
  if (!allowedPath.includes(String(to.name)) && !token.value) {
    return next('/forbidden')
  }

  next()
}
