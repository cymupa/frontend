import { storeToRefs } from 'pinia'
import type {
  NavigationGuardNext,
  RouteLocationNormalized as T
} from 'vue-router'

import { useAuthStore } from '@/stores/auth'

/**
 * Функция принимает параметры от vue и смотрит куда передвигается юзер

 * В зависимости от того, авторизирован он или нет, мы либо совершаем переход, либо переводим на 403
 * При этом пользователь без токена также сможет попасть на страницу NotFound (404)
 */
export const checkAuth = (to: T, _from: T, next: NavigationGuardNext): void => {
  const { token } = storeToRefs(useAuthStore())

  const allowedPath = [
    'login',
    'team',
    'news',
    'home',
    'teams',
    'product',
    'products',
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
