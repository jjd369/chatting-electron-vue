import Cookies from 'js-cookie'

export function getAccessToken() {
  return Cookies.get('accessToken')
}

export function getRefreshToken() {
  return Cookies.get('refreshToken')
}
