import type { State } from '@/api/core'
import { useFetch } from '@/hooks'

interface CategoriesRequests {
  getAll(): State<'categories', 'GET'>
}

export const categoriesApi: CategoriesRequests = {
  getAll: () => useFetch('categories', 'GET')
}
