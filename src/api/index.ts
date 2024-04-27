import axios from 'axios'

import { API_URL } from '@/config/env'
import { useAuthStore } from '@/stores/auth'

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    // TODO: надо проверить работает ли обновление токена
    Authorization: useAuthStore().token
  },
  timeout: 5000
})

export default instance
