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
      background-color: #393d49;
      color: #fff;
    }
    .content {
      padding: 20px;
    }
  }
}
</style>
