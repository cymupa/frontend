import type { ApiRequest, State } from '@/api/core'
import type {
  DynamicCartAddRouteKey,
  DynamicCartMinusRouteKey
} from '@/api/types'

import { useFetch } from '@/hooks'

interface CartRequests {
  getAll(): State<'carts', 'GET'>
  addToCart(): State<'carts', 'POST'>
  plusToCart(): State<DynamicCartAddRouteKey, 'GET'>
  minusFromCart(): State<DynamicCartMinusRouteKey, 'GET'>
}

export const cartApi: CartRequests = {
  getAll: () => useFetch('carts', 'GET'),
  addToCart: () => useFetch('carts', 'POST'),
  plusToCart: () => useFetch('countplus', 'GET'),
  minusFromCart: () => useFetch('countminus', 'GET')
}
