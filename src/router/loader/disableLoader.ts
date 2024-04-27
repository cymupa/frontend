import { useLoadStore } from '@/stores/load'
import type {
  NavigationFailure,
  RouteLocationNormalized as T
} from 'vue-router'

export const disableLoader = (
  to: T,
  from: T,
  _failure?: NavigationFailure | void
): void => {
  const isLoading = useLoadStore()
  const { changeState } = isLoading

  changeState(false)
}
