import type { ApiRequest, State } from '@/api/core'
import type { DynamicNewsRouteKey } from '@/api/types'

import { useFetch } from '@/hooks'

interface NewsRequests {
  getAllNews(): State<'news', 'GET'>
  getNewsById(
    req: ApiRequest<DynamicNewsRouteKey, 'GET'>
  ): State<DynamicNewsRouteKey, 'GET'>
}

export const newsApi: NewsRequests = {
  getAllNews: () => useFetch('news', 'GET'),
  getNewsById: (req) => useFetch(`news/${req.id}`, 'GET')
}
