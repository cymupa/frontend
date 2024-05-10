/** id итема в корзине */
export type DynamicCartAddRouteKey = `countplus/${string}`
export type DynamicCartMinusRouteKey = `countminus/${string}`

export interface DynamicCartController {
  [key: string]: {
    GET: {
      req: { id: string }
      res: ActionCartRequest
    }
    POST: {
      req: {}
      res: {}
    }
  }
}

export interface CartController {
  carts: {
    GET: {
      req: {}
      res: Product[]
    }
    POST: {
      req: AddCartRequest
      res: CartProduct
    }
  }
}

interface CartProduct {
  id: number
  quantity: number
  product_id: number
  user_id: number
  created_at: Date
  updated_at: Date
}

interface Product {
  id: number
  name: string
  description: string
  quantity: number
  photo: string
  price: string
  category_id: number
  created_at: Date
  updated_at: Date
}

export interface AddCartRequest {
  product_id: number
  quantity: number
}

export interface ActionCartRequest {
  id: number
  quantity: number
  product_id: number
  user_id: number
  created_at: Date
  updated_at: Date
  product: Product
}
