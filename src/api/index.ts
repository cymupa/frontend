import axios from 'axios'

import { API_URL } from '@/config/env'

const instance = axios.create({
  baseURL: `${API_URL}asdasd`,
  headers: {
    'Access-Control-Allow-Origin': '*'
    // 'Content-Type': 'multipart/form-data'
  },
  timeout: 5000
})

export default instance
