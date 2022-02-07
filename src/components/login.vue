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
      <p>비밀번호를 입력해주세요.</p>
      <el-input
        class="input-login"
        placeholder="비밀번호를 입력해주세요."
        v-model="password"
        show-password
      ></el-input>
      <el-button @click="joinChatting()" :disabled="login_button"
        >로그인</el-button
      >
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      name: '',
      password: '',
      login_button: false,
    }
  },
  computed: {
    ...mapState('User', ['current_user']),
  },
  methods: {
    async joinChatting() {
      console.log('count')
      this.login_button = true
      if (!this.name) {
        return this.$message({
          type: 'info',
          message: '아이디를 입력해주세요.',
        })
      }
      await this.$store.dispatch('User/login', {
        name: this.name,
        password: this.password,
      })
      this.login_button = false
    },
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
