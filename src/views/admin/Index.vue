<template>
  <div class="container">
    <div class="menu">
      <Menu></Menu>
    </div>
    <div class="right">
      <div class="header">
        <Header></Header>
      </div>
      <!-- 存放主体部分 -->
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/admin/menu.vue'
import Header from '@/components/admin/Aheader.vue'
export default {
  name: 'IndexPage',
  components: {
    Menu,
    Header
  },
  async mounted() {
    // 保证每个路由刷新的时候都会获取到最新的用户头像数据
    // ps: 后期会整合简约逻辑
    // 获取token，解析用户名
    const { data: res } = await this.$http.get('/admin/getAvatar', {
      headers: {
        Authorization: localStorage.getItem('adminToken')
      }
    })
    if (res.status === 200) {
      this.$store.commit('editAvatar/adminAvatar', res.data.avatar)
      this.$store.state.adminName = res.data.aname
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  .menu {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: #393d49;
  }
  .right {
    padding-left: 200px;
    height: 100vh;
    background-color: #f2f3f5;
    .header {
      height: 55px;
      line-height: 55px;
      background-color: #ffffff;
      color: #fff;
    }
    .content {
      padding: 20px;
    }
  }
}
</style>
