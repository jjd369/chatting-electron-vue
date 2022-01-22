import request from '@/utils/request'

export function getAllmessages(params) {
  return request({
    url: '/message/messages',
    method: 'get',
    params,
  })
}
