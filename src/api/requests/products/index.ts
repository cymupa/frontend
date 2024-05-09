import type { ApiRequest, State } from '@/api/core'
import type { DynamicProductsRouteKey } from '@/api/types'

import { useFetch } from '@/hooks'

interface ProductsRequests {
  getAll(): State<'products', 'GET'>
  getById(
    req: ApiRequest<DynamicProductsRouteKey, 'GET'>
  ): State<DynamicProductsRouteKey, 'GET'>
}

export const productsApi: ProductsRequests = {
  getAll: () => useFetch('products', 'GET'),
  getById: (req) => useFetch(`products/${req.id}`, 'GET')
}
