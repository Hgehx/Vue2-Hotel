<template>
  <div class="container">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      background-color="#393d49"
      text-color="#fff"
      router
      active-text-color="#fff"
    >
      <el-menu-item index="">
        <div class="title">后台管理系统</div>
      </el-menu-item>
      <el-menu-item index="home" :route="{ path: '/admin/' }">
        <i class="iconfont icon-shouye"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="resv" :route="{ path: '/admin/resv' }">
        <i class="iconfont icon-wodeyuyue"></i>
        <span slot="title">预定信息管理</span>
      </el-menu-item>
      <el-menu-item index="room" :route="{ path: '/admin/room' }">
        <i class="iconfont icon-fangjianweihu"></i>
        <span slot="title">客房信息管理</span>
      </el-menu-item>
      <el-menu-item index="revi" :route="{ path: '/admin/revi' }">
        <i class="iconfont icon-pinglun"></i>
        <span slot="title">用户评价管理</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="iconfont icon-yonghu"></i>
          <span slot="title">个人中心</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="binfo" :route="{ path: '/admin/binfo' }">
            <i class="iconfont icon-wodexinxi_jibenxinxi"></i
            >基本信息</el-menu-item
          >
          <el-menu-item index="epassword" :route="{ path: '/admin/epassword' }">
            <i class="iconfont icon-mima"></i>修改密码</el-menu-item
          >
          <el-menu-item index="eavatar" :route="{ path: '/admin/eavatar' }">
            <i class="iconfont icon-xiugai"></i>修改头像</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'AdminMenu',
  data() {
    return {}
  },
  computed: {
    activeIndex() {
      // 获取当前路由路径
      const currentPath = this.$route.path
      console.log(currentPath.includes('/admin/room'))
      // 判断当前路由是否是子路由的路径之一
      if (currentPath.includes('/admin/room')) {
        return '/admin/room' // 设置父级菜单项的 index
      }
      return currentPath
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 200px;
  .title {
    font-size: 20px;
    height: 55px;
    line-height: 55px;
    text-align: center;
  }
  .iconfont {
    margin-right: 10px;
    margin-left: 5px;
    font-size: 20px;
  }
  .el-menu {
    border-right: solid 0px #e6e6e6;
    .el-menu-item {
      font-size: 16px;
    }
    /deep/ .is-active {
      background-color: #179688 !important;
    }
  }
}
</style>
