import axios from 'axios'

import { API_URL } from '@/config/env'

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  timeout: 5000
})

export default instance
