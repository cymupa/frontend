import type { Product } from '@/types/Product'

/** id итема в корзине */
export type DynamicCartAddRouteKey = `countplus`
export type DynamicCartMinusRouteKey = `countminus`

export interface DynamicCartController {
  countplus: {
    GET: {
      req: {}
      res: ActionCartRequest
    }
    POST: {
      req: {}
      res: {}
    }
  }

  countminus: {
    GET: {
      req: {}
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

export interface CartProduct {
  id: number
  quantity: number
  product_id: number
  user_id: number
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
