import type { ApiRequest } from '@/api/core'
import type { DynamicNewsRouteKey } from '@/api/types'

import { type State, useFetch } from '@/hooks'

interface NewsRequests {
  getAllNews(req?: ApiRequest<'news', 'GET'>): State<'news', 'GET'>
  getNewsById(
    req: ApiRequest<DynamicNewsRouteKey, 'GET'>
  ): State<DynamicNewsRouteKey, 'GET'>
}

export const newsApi: NewsRequests = {
  getAllNews: (req) => useFetch('news', 'GET', req),
  getNewsById: (req) => useFetch(`news/${req.id}`, 'GET', req)
}
