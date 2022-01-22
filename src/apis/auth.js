import request from '@/utils/request'

export function login(data) {
  return request.post('/auth/signIn', data)
}
export function logout(data) {
  return request.delete('/auth/logOut', data)
}
