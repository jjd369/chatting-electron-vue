<template>
  <div class="side-bar-wrap">
    <div class="btn-wrap">
      <el-button
        @click="$router.push({ name: 'userList' }).catch(() => {})"
        type="primary"
        icon="el-icon-user-solid"
        circle
      ></el-button>
    </div>
    <div class="btn-wrap">
      <el-button
        @click="$router.push({ name: 'chatList' }).catch(() => {})"
        type="success"
        icon="el-icon-chat-line-round"
        circle
      ></el-button>
    </div>
    <div @click="leaveChatting">로그아웃</div>
  </div>
</template>

<script>
export default {
  methods: {
    leaveChatting() {
      this.$store.dispatch('User/logout', '')
      this.$socket.emit('leave server')
      this.$router.push({ name: 'login' })
    },
  },
}
</script>

<style scoped>
.side-bar-wrap {
  margin-top: 30px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn-wrap {
  margin-bottom: 10px;
}
</style>
