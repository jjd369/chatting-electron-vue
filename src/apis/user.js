import request from '@/utils/request'

export function getAllUSer(params) {
  return request({
    url: 'user/users',
    method: 'get',
    params,
  })
}
