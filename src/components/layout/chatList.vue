<template>
  <div>
    <div class="title-wrap">
      <h3>Messages</h3>
      <div class="group-chat-list">
        <h4>group message rooms</h4>
        <template v-for="chat in group">
          <div
            class="item"
            @contextmenu.prevent="
              handleContextMenu({
                top: `${$event.y}px`,
                left: `${$event.x}px`,
                room_id: chat,
              })
            "
            :key="chat"
          >
            <span class="img-wrap"> <i class="el-icon-user-solid"></i> </span
            >{{ chat }}
          </div>
        </template>
      </div>
    </div>
    <CONTEXTMEUN></CONTEXTMEUN>
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
    }
  },
  computed: {
    ...mapState('Chat', ['group']),
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
</style>
