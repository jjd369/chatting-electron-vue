<template>
  <div class="chat-wrap">
    <div class="title-wrap">
      <span class="user-img-wrap"><i class="el-icon-user-solid"></i></span>
      <template v-for="(member, index) in room_members">
        <div class="title" :key="index">{{ member }}</div>
      </template>
    </div>
    <div class="header">
      <span>{{ target_room_id }}</span>
      <span
        ><el-button icon="el-icon-search" circle size="mini"></el-button
      ></span>
    </div>
    <div class="body">
      <template v-for="(message, index) in messages">
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
            <span>{{ message.sender }}</span>
            <span class="balloon">
              {{ message.content }}
            </span>
          </div>
        </div>
      </template>
    </div>
    <div class="bottom">
      <div class="inputWrap">
        <input type="text" v-model="input_message" />
      </div>
      <div
        ><el-button
          @click="sendMessage"
          :disabled="!input_message.length ? true : false"
          >전송</el-button
        ></div
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import { sendMessage } from '@/utils/socket'
export default {
  data() {
    return {
      input_message: '',
      room_members: [],
    }
  },
  computed: {
    ...mapState('Chat', ['messages', 'target_room_id']),
    ...mapState('User', ['current_user', 'all_users']),
    c_find_target_user() {
      return this.all_users.find((el) => {
        return el.id === this.target_room_id
      })
    },
    c_filter_message(){
      return messages.filter((messages)=>{})
    }
  },
  methods: {
    sendMessage() {
      // const new_message = {
      //   content: this.input_message,
      //   to: this.target_room_id,
      //   sender: this.current_user,
      //   chatName: this.target_room_id,
      // }
      // sendMessage(new_message)
    },
    newMessageCb(payload) {
      this.$store.dispatch('Chat/callSetNewMessage', payload)
    },
    fliter_room_members() {
      this.room_members = this.$route.query.room_members.filter(
        (el) => el !== this.current_user
      )
    },
  },
  mounted() {
    this.fliter_room_members()
  },
}
</script>

<style lang="scss">
.chat-wrap {
  position: relative;
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
</style>
