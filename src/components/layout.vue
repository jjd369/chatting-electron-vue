<template>
  <div>
    <template>
      <el-container style="height: 100vh">
        <el-aside class="side-bar-container" width="70px"
          ><SIDEBAR></SIDEBAR
        ></el-aside>
        <el-main>
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
<style lang="scss">
.side-bar-container {
  border-right: 1px solid #ebeef5;
}
.el-main {
  padding: 20px 0;
}
</style>
