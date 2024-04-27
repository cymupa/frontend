import { useLoadStore } from '@/stores/load'
import type {
  NavigationGuardNext,
  RouteLocationNormalized as T
} from 'vue-router'

export const setLoader = (
  _to: T,
  _from: T,
  next: NavigationGuardNext
): void => {
  const isLoading = useLoadStore()
  const { changeState } = isLoading

  changeState(true)

  setTimeout(() => {
    next()
  }, 500)
}
