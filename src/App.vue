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
  mounted() {
    socket.connection()
    socket.subscribeMessage()
    socket.subscribeUser()
  },
  beforeDestroy() {
    socket.removeAllListeners()
    socket.disconnection()
  },
}
</script>
<style lang="scss">
#app {
  background: #fff;
}
</style>
