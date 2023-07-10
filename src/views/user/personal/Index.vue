<template>
  <div class="container">
    <!-- 顶部导航 -->
    <div class="header">
      <div class="wrapper">
        <Uheader></Uheader>
      </div>
    </div>

    <div class="content">
      <div class="wrapper">
        <div class="left">
          <userMenu></userMenu>
        </div>
        <div class="right">
          <router-view></router-view>
        </div>
      </div>
    </div>

    <!-- 底部导航 -->
    <div class="footer">
      <div class="wrapper">
        <Ufooter></Ufooter>
      </div>
    </div>
  </div>
</template>

<script>
import Uheader from '@/components/user/Uheader.vue'
import userMenu from '@/components/user/menu.vue'
import Ufooter from '@/components/user/Ufooter'
export default {
  name: 'userIndex',
  components: { Uheader, userMenu, Ufooter },
  mounted() {
    this.getAvatar()
  },
  methods: {
    async getAvatar() {
      const { data: res } = await this.$http.get('/user/getAvatar', {
        headers: {
          Authorization: localStorage.getItem('userToken')
        }
      })
      if (res.status === 200) {
        this.$store.commit('editAvatar/userAvatar', res.data.avatar)
        this.$store.state.userName = res.data.username || '尊敬的用户'
        this.$store.state.userPhone = res.data.phone
        // console.log(res)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  background-color: #f1f1f1; /* 灰色背景色 */
  .header {
    background-color: #fff;
    height: 70px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* 底部边框阴影效果 */
  }
  .content {
    margin-top: 20px;
    margin-bottom: 50px;
    .wrapper {
      display: flex;
      .left {
        flex: 1;
      }
      .right {
        flex: 4.3;
      }
    }
  }
  .footer {
    background-color: #fff;
  }
  .wrapper {
    width: 1160px;
    margin: 0 auto;
  }
}
</style>
