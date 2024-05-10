export interface CategoriesController {
  categories: {
    GET: {
      req: {}
      res: GetCategoriesResponse[]
    }
    POST: {
      req: {}
      res: {}
    }
  }
}

export interface GetCategoriesResponse {
  id: number
  name: string
  created_at: string
  updated_at: string
}
