import io from 'socket.io-client'
import store from '@/store'
// import router from '@/router'

class SocketService {
  socket
  constructor() {}
  connection() {
    this.socket = io('http://localhost:3333')
  }
  getSocket() {
    return this.socket
  }
  disconnection() {
    this.socket.disconnect()
  }
  removeAllListeners() {
    this.socket.removeAllListeners()
  }
  subscribeMessage() {
    this.socket.on('new message', (payload) => {
      store.dispatch('Chat/callSetNewMessage', payload)
    })
  }
  subscribeUser() {
    this.socket.on('new user', (loginUsers) => {
      console.log(loginUsers)
      store.dispatch('User/callSetAllUsers', loginUsers)
    })
  }
}
export default new SocketService()

// export const socket = io('http://localhost:3333')

// export function joinServer(name) {
//   socket.emit('join server', name)
// }

// export function joinRoom(room) {
//   socket.emit('join room', room, (message) => {
//     store.dispatch('Chat/callSetMeesages', message)
//     router.push({ name: 'chat' })
//   })
// }

// export function sendMessage(message) {
//   socket.emit('send message', message)
//   store.dispatch('Chat/callSetNewMessage', message)
// }

// export function subscribeMessage() {
//   return socket.on('new message', (payload) => {
//     store.dispatch('Chat/callSetNewMessage', payload)
//   })
// }

// export function subscribeUser() {
//   return socket.on('new user', (allUsers) => {
//     console.log(allUsers)
//     store.dispatch('User/callSetAllUsers', allUsers)
//   })
// }

// export function unsubscribeEvent(event) {
//   return socket.off(event, () => {
//     console.log(event + 'is off')
//   })
// }
