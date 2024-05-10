export type DynamicProductsRouteKey = `products/${string}`

export interface DynamicProductsController {
  [key: string]: {
    GET: {
      req: { id: string }
      res: GetProductsResponse
    }
    POST: {
      req: {}
      res: {}
    }
  }
}

export interface ProductsController {
  products: {
    GET: {
      req: {}
      res: GetProductsResponse[]
    }
    POST: {
      req: {}
      res: {}
    }
  }
}

export interface GetProductsResponse {
  id: number
  name: string
  description: string
  quantity: number
  photo: string
  price: string
  category_id: number
  created_at: string
  updated_at: string
}
