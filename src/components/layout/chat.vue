<template>
  <div class="chat-wrap">
    <div class="title-wrap">
      <span class="user-img-wrap"><i class="el-icon-user-solid"></i></span>
      <div v-if="this.getExceptCurrentUser.length">
        <template v-for="(member, index) in getExceptCurrentUser">
          <div class="title" :key="index">{{ member }}</div>
        </template>
      </div>
      <div v-else>
        <div class="title">{{ current_user }}</div>
      </div>
      <span
        ><el-button icon="el-icon-search" circle size="mini"></el-button
      ></span>
    </div>
    <div class="body" ref="chatBody">
      <template v-for="(message, index) in getMessageById">
        <div
          :key="index"
          :class="[
            'item',
            current_user === message.sender ? 'reverse-item' : '',
          ]"
        >
          <div>
            <span class="user-img-wrap">
              <i class="el-icon-user-solid"></i
            ></span>
          </div>
          <div class="message-item-body">
            <span v-if="current_user !== message.sender">{{
              message.sender
            }}</span>
            <span class="balloon">
              {{ message.content }}
            </span>
          </div>
        </div>
      </template>
    </div>
    <div class="bottom">
      <el-input placeholder="Please input" v-model="input_message">
        <el-button
          slot="append"
          :disabled="!input_message.length ? true : false"
          icon="el-icon-search"
          @click="sendMessage"
        ></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import socket from '@/utils/socket'
export default {
  data() {
    return {
      input_message: '',
    }
  },
  computed: {
    ...mapState('User', ['current_user', 'all_users']),
    ...mapGetters('Chat', [
      'getMessageById',
      'getExceptCurrentUser',
      'getIdByMembers',
    ]),
  },
  methods: {
    sendMessage() {
      const message = {
        content: this.input_message,
        to: this.getExceptCurrentUser,
        sender: this.current_user,
      }
      socket.sendMessage(message)
      this.$store.dispatch('Chat/callSetNewMessage', {
        message,
        chatId: this.getIdByMembers,
      })
    },
    handleScroll() {
      console.log('scroll')
      // this.$refs.style.bottom = '500px'
    },
  },
  mounted() {
    console.log(this.$refs.chatBody)
  },
  destroyed() {},
}
</script>

<style lang="scss">
.chat-wrap {
  position: relative;
  min-height: 100%;
}
.header {
  z-index: 9999;
  display: flex;
  align-items: center;
}
.message-item-body {
  display: flex;
  flex-direction: column;
}
.title-wrap {
  position: absolute;
  width: 100%;
  top: 0;
  background: #fff;
  z-index: 9999;
}
.body {
  position: absolute;
  width: 100%;
  height: 80vh;
  bottom: 0;
  overflow-y: scroll;
  padding-top: 60px;
  padding-bottom: 40px;
}
.bottom {
  position: absolute;
  width: 100%;
  bottom: 0;
}
</style>
