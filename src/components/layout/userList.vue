<template>
  <div class="user-list-wrap">
    <div></div>
    <div class="title-wrap">
      <h3>friends</h3>
    </div>
    <div
      class="my-info item"
      @contextmenu.prevent="
        handleContextMenu({ top: `${$event.y}px`, left: `${$event.x}px` })
      "
    >
      <span class="img-wrap">
        <i class="el-icon-user-solid"></i>
      </span>
      {{ current_user }}
    </div>
    <div class="user-list">
      <template v-for="(user, index) in c_filter_all_users">
        <div
          class="item"
          @contextmenu.prevent="
            handleContextMenu({
              top: `${$event.y}px`,
              left: `${$event.x}px`,
              room_id: user.id,
            })
          "
          :key="index"
        >
          <span class="img-wrap"> <i class="el-icon-user-solid"></i> </span>
          {{ user.username }}
        </div>
      </template>
    </div>
    <CONTEXTMEUN></CONTEXTMEUN>
    <!-- <div
      v-if="view_menu"
      class="right-click-menu"
      ref="rightClickMenu"
      @blur="closeMenu"
      tabindex="1"
      :style="c_position"
    >
      <ul>
        <li>프로필</li>
        <li>채팅하기</li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import CONTEXTMEUN from '@/components/layout/contextMenu'
import { mapState } from 'vuex'
export default {
  components: {
    CONTEXTMEUN,
  },
  data() {
    return {
      target_room: '',
    }
  },
  computed: {
    ...mapState('User', ['all_users', 'current_user']),
    ...mapState('ContextMenu', ['handle_context_menu']),
    c_filter_all_users() {
      return this.all_users.filter(
        (user) => user.username !== this.current_user
      )
    },
  },
  methods: {
    handleContextMenu({ top, left, room_id }) {
      this.target_room = room_id
      this.$store.dispatch('ContextMenu/callHandleMenu', {
        top,
        left,
        bool: true,
      })
    },
  },
}
</script>

<style scoped>
.title-wrap {
  padding: 10px 20px;
}
.title-wrap h3 {
  font-size: 24px;
}
.user-list,
.group-chat-list {
  border-top: 1px solid #eaeefb;
  margin: 0 10px;
}
.img-wrap {
  display: flex;
  justify-content: center;
  align-content: center;
  border-radius: 100%;
  background: #eee;
  padding: 10px;
  margin-right: 10px;
}
.item {
  padding: 10px 20px;
  display: flex;
  align-items: center;
}
.item:hover {
  background: #eee;
}
</style>
