<template>
  <div class="container">
    <el-menu
      default-active="/admin/"
      class="el-menu-vertical-demo"
      background-color="#393d49"
      text-color="#fff"
      router
      active-text-color="#fff"
    >
      <el-menu-item index="">
        <div class="title">后台管理系统</div>
      </el-menu-item>
      <el-menu-item index="/admin/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/admin/resv">
        <i class="el-icon-tickets"></i>
        <span slot="title">预定信息管理</span>
      </el-menu-item>
      <el-menu-item index="/admin/room">
        <i class="el-icon-tickets"></i>
        <span slot="title">客房评价管理</span>
      </el-menu-item>
      <el-menu-item index="/admin/revi">
        <i class="el-icon-tickets"></i>
        <span slot="title">用户评价管理</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span slot="title">个人中心</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin/binfo">基本信息</el-menu-item>
          <el-menu-item index="/admin/eavatar">修改头像</el-menu-item>
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
  methods: {}
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
  .el-menu {
    border-right: solid 0px #e6e6e6;
    .el-menu-item {
      font-size: 16px;
    }
    /deep/ .is-active {
      background-color: #029688 !important;
    }
  }
}
</style>
