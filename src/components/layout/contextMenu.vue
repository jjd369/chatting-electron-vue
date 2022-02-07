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
      <li class="item" @click="joinChat">채팅하기</li>
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
export default {
  props: {
    type: [String],
  },
  computed: {
    ...mapState('User', ['current_user']),
    ...mapState('ContextMenu', ['handle_context_menu', 'position']),
    ...mapState('Chat', ['target_room_id']),
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
      this.$store.dispatch('ContextMenu/callCloseMenu')
    },
    joinChat() {
      this.$router.push({
        name: 'chat',
        query: { to: this.to, isGroup: this.isGroup },
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
