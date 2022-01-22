<template>
  <div id="app">
    <router-view key="2" v-if="current_user" />
    <LOGIN key="1" v-else></LOGIN>
  </div>
</template>
<script>
import LOGIN from '@/components/login'
import { mapState } from 'vuex'
import { getAccessToken } from '@/utils/token'
import socket from '@/utils/socket'

export default {
  components: {
    LOGIN,
  },
  computed: {
    ...mapState('User', ['current_user']),
  },
  methods: {
    getAccessToken,
  },
  created() {
    // window.addEventListener('beforeunload', function () {
    //   console.log('test')
    //   socket.removeAllListeners()
    // })
  },
  mounted() {
    socket.connection()
    socket.subscribeMessage()
    socket.subscribeUser()
    console.log(socket.getSocket())
  },
  beforeDestroy() {
    socket.removeAllListeners()
    socket.disconnection()
  },
}
</script>
