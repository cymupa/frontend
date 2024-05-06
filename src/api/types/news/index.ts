export type DynamicNewsRouteKey = `news/${string}`

export interface DynamicNewsController {
  [key: string]: {
    GET: {
      req: { id: string }
      res: GetNewsResponse
    }
  }
}

export interface NewsController {
  news: {
    GET: {
      req: {}
      res: GetNewsResponse[]
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
