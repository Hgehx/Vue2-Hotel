<template>
  <div class="header">
    <div class="left">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          :to="{ path: item.path }"
          v-for="item in breadcrumbList"
          :key="item.path"
          >{{ item.meta.title }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="right">
      <span>{{ $store.state.adminName }}</span>
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
          <el-dropdown-item command="binfo" divided> 个人中心</el-dropdown-item>
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminHeader',
  data() {
    return {}
  },
  computed: {
    breadcrumbList() {
      return this.$route.matched
    }
  },
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
  line-height: 60px;
  height: 60px;
  .left {
    margin-left: 20px;
  }

  .right {
    margin-right: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      color: #000;
      margin-right: 10px;
    }
    img {
      width: 50px;
      height: 50px;
    }
    .iconfont {
      margin-right: 10px;
      margin-left: 5px;
      font-size: 20px;
    }
    .el-dropdown {
      height: 40px;
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
