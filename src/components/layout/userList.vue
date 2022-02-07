<template>
  <div class="user-list-wrap">
    <div></div>
    <div class="title-wrap">
      <div class="title"><h3>users</h3></div>
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
    <div
      class="currnet-user-wrap item"
      @contextmenu.prevent="
        callHandleMenu({
          top: `${$event.y}px`,
          left: `${$event.x}px`,
          bool: true,
          isGroup: false,
          members: [current_user],
        })
      "
    >
      <span class="user-img-wrap my-img">
        <i class="el-icon-user-solid"></i>
      </span>
      {{ current_user }}
    </div>
    <div class="user-list">
      <template v-for="(user, index) in c_filter_all_users">
        <div
          class="item"
          @contextmenu.prevent="
            callHandleMenu({
              top: `${$event.y}px`,
              left: `${$event.x}px`,
              bool: true,
              isGroup: false,
              members: [current_user, user.name],
            })
          "
          :key="index"
        >
          <span class="user-img-wrap"><i class="el-icon-user-solid"></i></span>
          {{ user.name }}
        </div>
      </template>
    </div>
    <CONTEXTMEUN type="userList"></CONTEXTMEUN>
  </div>
</template>

<script>
import CONTEXTMEUN from '@/components/layout/contextMenu'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    CONTEXTMEUN,
  },
  computed: {
    ...mapState('User', ['all_users', 'current_user']),
    ...mapState('ContextMenu', ['handle_context_menu']),
    c_filter_all_users() {
      return this.all_users?.filter((user) => user.name !== this.current_user)
    },
  },
  methods: {
    ...mapActions('ContextMenu', ['callHandleMenu']),
  },
}
</script>

<style lang="scss">
.current-user-wrap .user-img-wrap {
  display: flex;
  justify-content: center;
  align-content: center;
  border-radius: 100%;
  background: #eee;
  padding: 20px;
  margin-right: 10px;
}
.user-list-wrap {
  padding-top: 60px;
}
</style>
