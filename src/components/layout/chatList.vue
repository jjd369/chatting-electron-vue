<template>
  <div>
    <div class="title-wrap">
      <div class="title"><h3>message</h3></div>
      <div class="search"
        ><el-button icon="el-icon-search" circle size="small"></el-button
      ></div>
      <div class="chat"
        ><el-button
          icon="el-icon-chat-line-round"
          circle
          size="small"
        ></el-button
      ></div>
    </div>
    <div class="message-list-wrap">
      <template v-for="(message, key) in messages">
        <div
          class="item"
          @contextmenu.prevent="
            handleContextMenu({
              top: `${$event.y}px`,
              left: `${$event.x}px`,
              users: message.members,
            })
          "
          :key="key"
        >
          <span class="user-img-wrap"><i class="el-icon-user-solid"></i></span>
          <div class="chat-room">
            <span>{{ getSender(message.members) }}</span>
            <span>{{ getLastMessage(message.messages) }}</span>
          </div>
        </div>
      </template>
    </div>
    <CONTEXTMEUN type="chatList" :room_members="room_members"></CONTEXTMEUN>
  </div>
</template>

<script>
import CONTEXTMEUN from '@/components/layout/contextMenu'
import { mapState } from 'vuex'
export default {
  components: { CONTEXTMEUN },
  data() {
    return {
      target_room: '',
      room_members: [],
    }
  },
  computed: {
    ...mapState('Chat', ['group', 'target_room_id', 'messages']),
    ...mapState('User', ['current_user']),
  },
  methods: {
    handleContextMenu({ top, left, users }) {
      this.room_members = [...users]
      // this.$store.dispatch('Chat/callSetRoomId', room)
      this.$store.dispatch('ContextMenu/callHandleMenu', {
        top,
        left,
        bool: true,
      })
    },
    getSender(members) {
      const sender = members.filter((el) => el !== this.current_user)
      return sender.toString()
    },
    getLastMessage(messages) {
      const last_message_obj = [...messages].pop()
      return last_message_obj?.message
    },
  },
}
</script>

<style lang="scss">
.chat-room {
  display: flex;
  flex-direction: column;
  justify-content: center;
  span {
    &:first-child {
      padding-bottom: 4px;
    }
  }
}
</style>
