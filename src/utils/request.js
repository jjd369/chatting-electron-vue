import axios from 'axios'
import { getAccessToken, getRefreshToken, setAccessToken } from '@/utils/token'
import { refreshToken } from '@/apis/auth'
import store from '@/store'

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
    return response
  },
  async function (error) {
    if (
      error.config &&
      error.response &&
      error.response.status === 401 &&
      !error.config.retry
    ) {
      error.config.retry = true
      const { data } = await refreshToken({ token: getRefreshToken() })
      setAccessToken(data.accessToken)

      return instance.request(error.config)
    }
    if (error.config && error.response && error.response.status === 403) {
      store.dispatch('User/logout')
    }
    return Promise.reject(error)
  }
)

export default instance
