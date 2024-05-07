export type DynamicNewsRouteKey = `news/${string}`

export interface DynamicNewsController {
  [key: string]: {
    GET: {
      req: { id: string }
      res: GetNewsResponse
    }
    POST: {
      req: {}
      res: {}
    }
  }
}

export interface NewsController {
  news: {
    GET: {
      req: {}
      res: GetNewsResponse[]
    }
    POST: {
      req: {}
      res: {}
    }
  }
}

export interface GetNewsResponse {
  id: number
  name: string
  description: string
  content: string
  photos: Array<string>
}
