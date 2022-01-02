<template>
  <div>
    <template v-if="current_user">
      <el-container style="height: 100vh">
        <el-aside style="background: #eee" width="70px"
          ><SIDEBAR></SIDEBAR
        ></el-aside>
        <el-main>
          <!-- <USERLIST></USERLIST>
          <CHATLIST></CHATLIST
        >-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SIDEBAR from '@/components/layout/sideBar'

export default {
  components: { SIDEBAR },
  computed: {
    ...mapState('User', ['current_user']),
  },
}
</script>
<style scoped>
.el-main {
  padding: 20px 0;
}
</style>
