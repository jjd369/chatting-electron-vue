import io from 'socket.io-client'
import store from '@/store'

class SocketService {
  socket
  // constructor() { }
  connection() {
    this.socket = io('http://localhost:3333')
  }
  disconnection() {
    this.socket.disconnect()
  }
  removeAllListeners() {
    this.socket.removeAllListeners()
  }
  sendMessage(message_obj) {
    this.socket.emit('message update', message_obj)
  }
  subscribeMessage() {
    this.socket.on('new message', (payload) => {
      store.dispatch('Chat/callSetNewMessage', payload)
    })
  }
  subscribeUser() {
    this.socket.on('new user', (loginUsers) => {
      console.log(loginUsers)
      store.dispatch('User/setLoginUser', loginUsers)
    })
  }
}

export default new SocketService()
