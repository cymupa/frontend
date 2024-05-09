import type { ApiRequest, State } from '@/api/core'
import type { DynamicProductsRouteKey } from '@/api/types'

import { useFetch } from '@/hooks'

interface ProductsRequests {
  getAllProducts(): State<'products', 'GET'>
  getProductById(
    req: ApiRequest<DynamicProductsRouteKey, 'GET'>
  ): State<DynamicProductsRouteKey, 'GET'>
}

export const productsApi: ProductsRequests = {
  getAllProducts: () => useFetch('products', 'GET'),
  getProductById: (req) => useFetch(`products/${req.id}`, 'GET')
}
