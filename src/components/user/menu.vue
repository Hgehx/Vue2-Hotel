<template>
  <div class="container">
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router>
      <el-menu-item index="/personal">
        <i class="iconfont icon-shouye"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
      <el-menu-item index="/personal/order">
        <i class="iconfont icon-wodeyuyue"></i>
        <span slot="title">订单</span>
      </el-menu-item>
      <el-menu-item index="/personal/review">
        <i class="iconfont icon-fangjianweihu"></i>
        <span slot="title">点评</span>
      </el-menu-item>
      <el-menu-item index="/personal/eavatar">
        <i class="iconfont icon-pinglun"></i>
        <span slot="title">修改头像</span>
      </el-menu-item>
      <el-menu-item index="/personal/epwd">
        <i class="iconfont icon-pinglun"></i>
        <span slot="title">修改密码</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'userMenu',
  data() {
    return {}
  },
  computed: {}
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
      // background-color: #179688 !important;
      color: blue;
    }
  }
}
</style>
