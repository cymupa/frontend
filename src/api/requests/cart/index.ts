import type { ApiRequest, State } from '@/api/core'
import type {
  DynamicCartAddRouteKey,
  DynamicCartMinusRouteKey
} from '@/api/types'

import { useFetch } from '@/hooks'

interface CartRequests {
  getAll(): State<'carts', 'GET'>
  addToCart(req: ApiRequest<'carts', 'POST'>): State<'carts', 'POST'>
  plusFromCart(
    req: ApiRequest<DynamicCartAddRouteKey, 'GET'>
  ): State<DynamicCartAddRouteKey, 'GET'>
  minusFromCart(
    req: ApiRequest<DynamicCartMinusRouteKey, 'GET'>
  ): State<DynamicCartMinusRouteKey, 'GET'>
}

export const cartApi: CartRequests = {
  getAll: () => useFetch('carts', 'GET'),
  addToCart: () => useFetch('carts', 'POST'),
  plusFromCart: (req) => useFetch(`countplus/${req.id}`, 'GET'),
  minusFromCart: (req) => useFetch(`countminus/${req.id}`, 'GET')
}
