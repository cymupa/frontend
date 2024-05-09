export type DynamicProductsRouteKey = `products/${string}`

export interface DynamicNewsController {
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
  news: {
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
  content: string
  photos: Array<string>
}
