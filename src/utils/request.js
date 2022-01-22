import axios from 'axios'
import { getAccessToken } from '@/utils/token'
const instance = axios.create({
  baseURL: 'http://localhost:3333/',
  timeout: 10000,
})

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    if (getAccessToken()) {
      config.headers.Authorization = `Bearer ${getAccessToken()}`
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default instance
