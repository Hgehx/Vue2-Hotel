<template>
  <div class="container">
    <!-- 顶部导航 -->
    <div class="header">
      <div class="wrapper">
        <Uheader></Uheader>
      </div>
    </div>
    <!-- 酒店信息 -->
    <div class="hotel_info">
      <div class="wrapper">酒店信息</div>
    </div>

    <!-- 酒店预定 -->

    <!-- 用户评价 -->

    <!-- 服务政策 -->

    <!-- 底部导航 -->
  </div>
</template>

<script>
import Uheader from '@/components/user/Uheader'
export default {
  name: 'userIndex',
  data() {
    return {}
  },
  components: {
    Uheader
  }
}
</script>

<style lang="less" scoped>
.container {
  background-color: #f5f7fa;

  .header {
    background-color: #fff;
    height: 70px;
  }
  .hotel_info {
    margin-top: 20px;
    .wrapper {
      height: 410px;
      background-color: skyblue;
    }
  }
}
.wrapper {
  width: 1160px;
  margin: 0 auto;
}
</style>
