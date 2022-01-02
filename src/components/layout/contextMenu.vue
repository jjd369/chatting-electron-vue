<template>
  <div
    v-if="handle_context_menu"
    class="right-click-menu"
    ref="rightClickMenu"
    @blur="closeMenu"
    tabindex="1"
    :style="position"
  >
    <ul>
      <li class="item">프로필</li>
      <li class="item" @click="joinRoom">채팅하기</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('ContextMenu', ['handle_context_menu', 'position']),
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
    joinRoom() {
      // this.$socket.emit('join room', () => {})
    },
  },
}
</script>

<style scoped>
.right-click-menu {
  position: absolute;
  z-index: 99999;
  border: 1px solid #eee;
  padding: 10px 0;
  background: #fff;
  min-width: 120px;
}
.right-click-menu:focus {
  outline: none;
}
.item {
  padding: 3px 5px;
  font-size: 12px;
}
.item:hover {
  background: #eee;
}
</style>
