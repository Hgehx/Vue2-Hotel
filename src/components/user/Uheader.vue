<template>
  <div class="header">
    <div class="logo">
      <img src="@/assets/logo_color.png" alt="" />
    </div>
    <div class="userinfo">
      <div class="avatar">
        <!-- 下拉菜单 -->
        <el-dropdown
          @command="handleCommand"
          :show-timeout="10"
          placement="bottom"
        >
          <!-- 头像 -->
          <el-avatar :src="$store.state.editAvatar.adminAvatar"></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="binfo">
              {{ $store.state.adminName }}</el-dropdown-item
            >
            <el-dropdown-item command="binfo" divided>
              个人中心</el-dropdown-item
            >
            <el-dropdown-item command="exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="myOrder">
        <i class="iconfont icon-dingdan"></i>
        我的订单
      </div>
      <div class="serve"><i class="iconfont icon-kefu"></i>客服</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userHeader',
  methods: {
    handleCommand(command) {
      // 个人中心
      if (command === 'binfo') {
        this.$router.push('/admin/binfo')
      }
      if (command === 'exit') {
        // 退出
        this.$confirm('确定退出登录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$message({
              type: 'success',
              message: '退出成功!'
            })
            localStorage.removeItem('adminToken')
            this.$router.push('/admin/login')
          })
          .catch(() => {})
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    img {
      height: 40px;
    }
  }
  .userinfo {
    display: flex;
    justify-content: center;
    align-items: center;
    .avatar {
      margin-right: 20px;
    }
    .myOrder {
      margin-right: 20px;
      i {
        color: #5b78a8;
        font-size: 18px;
      }
    }

    .serve {
      i {
        margin-right: 5px;
        font-size: 18px;
        color: #5b78a8;
      }
    }
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>
