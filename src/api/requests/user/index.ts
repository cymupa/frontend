import { type State, useFetch } from '@/hooks'

interface UserRequests {
  getUserInfo(): State<'me', 'GET'>
  updateUserInfo(): State<'users', 'POST'>
}

export const userApi: UserRequests = {
  getUserInfo: () => useFetch('me', 'GET'),
  updateUserInfo: () => useFetch('users', 'POST')
}
