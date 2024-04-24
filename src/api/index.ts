import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://cloud-storage.api/api-file',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  timeout: 5000,
})

export default instance
