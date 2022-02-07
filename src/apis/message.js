import request from '@/utils/request'

export function getAllmessages(params) {
  return request({
    url: '/message/messages',
    method: 'get',
    params,
  })
}
export function messageRooms(params) {
  return request({
    url: '/message/messageRooms',
    method: 'get',
    params,
  })
}
export function getMessage(params) {
  return request({
    url: '/message/message',
    method: 'get',
    params,
  })
}
