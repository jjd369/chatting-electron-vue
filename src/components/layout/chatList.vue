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
      <template v-for="(room, key) in messages">
        <div
          class="item"
          @contextmenu.prevent="
            callHandleMenu({
              top: `${$event.y}px`,
              left: `${$event.x}px`,
              bool: true,
              members: room.members,
              isGroup: room.isGroup,
            })
          "
          :key="key"
        >
          <span class="user-img-wrap"><i class="el-icon-user-solid"></i></span>
          <div class="chat-room">
            <span>{{ getSender(room.members) }}</span>
            <span>{{ getLastMessageById(room._id) }}</span>
          </div>
        </div>
      </template>
    </div>
    <CONTEXTMEUN type="chatList"></CONTEXTMEUN>
  </div>
</template>

<script>
import CONTEXTMEUN from '@/components/layout/contextMenu'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  components: { CONTEXTMEUN },
  computed: {
    ...mapState('Chat', ['messages']),
    ...mapState('User', ['current_user']),
    ...mapGetters('Chat', ['getLastMessageById']),
  },
  methods: {
    ...mapActions('ContextMenu', ['callHandleMenu']),
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
.message-list-wrap {
  padding-top: 60px;
}
</style>
