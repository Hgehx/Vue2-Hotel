<template>
  <div class="header">
    <div class="logo">
      <img @click="$router.push('/')" src="@/assets/logo_color.png" alt="" />
    </div>
    <div class="userinfo">
      <div class="backHome" @click="$router.push('/')">
        <i class="iconfont icon-shouye"></i>首页
      </div>
      <div class="avatar">
        <!-- 下拉菜单 -->
        <el-dropdown
          @command="handleCommand"
          :show-timeout="10"
          placement="bottom"
        >
          <!-- 头像 -->
          <div class="avatarSpan">
            <el-avatar
              :size="25"
              :src="$store.state.editAvatar.adminAvatar"
            ></el-avatar>
            <span>123<i class="el-icon-arrow-down el-icon--right"></i></span>
          </div>

          <el-dropdown-menu slot="dropdown" style="width: 180px">
            <el-dropdown-item
              command="binfo"
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
            >
              <el-avatar
                class="bigAvatar"
                :size="60"
                :src="$store.state.editAvatar.adminAvatar"
              ></el-avatar>
              <div class="right">
                <div style="padding: 5px 0 0 0; margin-left: 5px">
                  尊敬的用户
                </div>
                <div><i class="iconfont icon-huiyuan"></i>普通会员</div>
              </div>
            </el-dropdown-item>
            <el-dropdown-item command="binfo" divided>
              <i class="iconfont icon-yonghu"></i>个人中心</el-dropdown-item
            >
            <el-dropdown-item command="review"
              ><i class="iconfont icon-fuwudianping"></i>点评</el-dropdown-item
            >
            <el-dropdown-item command="exit"
              ><i class="iconfont icon-tuichu"></i>退出</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div
        class="myOrder"
        @click="$router.push('/personal/order')"
        style="cursor: pointer"
      >
        <i class="iconfont icon-dingdan"></i>
        我的订单
      </div>
      <div class="serve">
        <el-dropdown
          @command="handleCommand"
          :show-timeout="10"
          placement="bottom"
        >
          <span class="el-dropdown-link">
            <i class="iconfont icon-kefu"></i
            ><span style="color: #000">客服</span>
          </span>

          <el-dropdown-menu slot="dropdown" style="width: 180px">
            <el-dropdown-item>
              客服电话：
              <p>1314-666-666</p></el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
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
        this.$router.push('/personal')
      }
      if (command === 'review') {
        this.$router.push('/personal/review')
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
            // localStorage.removeItem('adminToken')
            this.$router.push('/login')
          })
          .catch(() => {})
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 220px;
  z-index: 999;
  .logo {
    img {
      height: 40px;
      cursor: pointer;
    }
  }
  .userinfo {
    display: flex;
    justify-content: center;
    align-items: center;
    .backHome {
      margin-right: 15px;
      cursor: pointer;
      i {
        margin-right: 3px;
        font-size: 18px;
        color: #5b78a8;
      }
    }
    .avatar {
      margin-right: 15px;
      .avatarSpan {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        background: #f2f8fe;
        border-radius: 16px 16px 16px 16px;
        padding: 4px 8px 4px 4px;
        cursor: pointer;
        span {
          margin-left: 10px;
        }
      }
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
