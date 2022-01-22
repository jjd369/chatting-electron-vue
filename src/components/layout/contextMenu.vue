<template>
  <div
    v-if="handle_context_menu"
    class="right-click-menu"
    ref="rightClickMenu"
    @blur="closeMenu"
    tabindex="1"
    :style="position"
  >
    <ul v-if="type === 'userList'">
      <li class="item">프로필 보기</li>
      <li v-if="!c_check_current_user" class="item" @click="joinChat"
        >채팅하기</li
      >
      <li v-else class="item" @click="joinChat">나와의 채팅</li>
    </ul>
    <ul v-if="type === 'chatList'">
      <li class="item" @click="joinChat">채팅방 열기</li>
      <li class="item">채팅방 나가기</li>
      <li></li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import { joinChat } from '@/utils/socket'
export default {
  props: {
    type: [String],
    room_members: [Array],
  },
  computed: {
    ...mapState('User', ['current_user']),
    ...mapState('ContextMenu', ['handle_context_menu', 'position']),
    ...mapState('Chat', ['target_room_id']),
    c_check_current_user() {
      return this.room_members.find((el) => el === this.current_user)
    },
  },
  watch: {
    handle_context_menu(newVal) {
      if (newVal) {
        this.openMenu()
      }
    },
  },
  methods: {
    openMenu() {
      this.$nextTick(() => {
        this.$refs.rightClickMenu.focus()
      })
    },
    closeMenu() {
      this.$store.dispatch('ContextMenu/callHandleMenu', { bool: false })
    },
    joinChat() {
      this.$router.push({
        name: 'chat',
        query: { room_members: this.room_members },
      })
    },
  },
}
</script>

<style lang="scss">
.right-click-menu {
  position: absolute;
  z-index: 99999;
  border: 1px solid #eee;
  padding: 10px 0;
  background: #fff;
  min-width: 120px;
  &:focus {
    outline: none;
  }
}
.item {
  padding: 3px 5px;
  font-size: 12px;
}
.item:hover {
  background: #eee;
}
</style>
