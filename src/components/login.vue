<template>
  <div class="login-wrap">
    <el-card class="card-wrap">
      <div class="icon-wrap">
        <i class="el-icon-chat-line-round"></i>
      </div>
      <p>아이디을 입력해주세요.</p>
      <el-input
        class="input-login"
        placeholder="아이디를 입력해주세요."
        v-model="name"
      ></el-input>
      <el-button @click="joinChatting()">로그인</el-button>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  sockets: {
    connect: function () {
      console.log('socket to notification channel connected')
    },
  },
  data() {
    return {
      name: '',
    }
  },
  computed: {
    ...mapState('User', ['current_user']),
  },
  methods: {
    joinChatting() {
      if (!this.name) {
        return this.$message({
          type: 'info',
          message: '아이디를 입력해주세요.',
        })
      }

      this.$socket.emit('join server', this.name)
      this.$store.dispatch('User/login', this.name)
    },
  },
  mounted() {
    this.$socket.on('new user', (allUsers) => {
      this.$store.dispatch('User/callSetAllUsers', allUsers)
    })
  },
}
</script>

<style scoped>
.login-wrap {
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.card-wrap {
  width: 310px;
  text-align: center;
}
.icon-wrap i {
  font-size: 5em;
}
.input-login {
  margin-bottom: 10px;
}
</style>
