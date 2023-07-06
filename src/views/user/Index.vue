<template>
  <div class="container">
    <!-- 回到顶部 -->
    <el-backtop :bottom="100" style="font-size: 30px"> </el-backtop>
    <!-- 顶部导航 -->
    <div class="header">
      <div class="wrapper">
        <Uheader></Uheader>
      </div>
    </div>
    <!-- 酒店信息 -->
    <div class="hotel_info">
      <div class="wrapper">
        <HotelInfo></HotelInfo>
      </div>
    </div>

    <!-- 酒店预定 -->
    <div class="room_info">
      <div class="wrapper">
        <RoomInfo></RoomInfo>
      </div>
    </div>

    <!-- 用户评价 -->
    <div class="revi">
      <div class="wrapper">
        <Revi></Revi>
      </div>
    </div>
    <!-- 服务政策 -->

    <!-- 底部导航 -->
    <div class="footer">
      <div class="wrapper">
        <Ufooter></Ufooter>
      </div>
    </div>
  </div>
</template>

<script>
import Uheader from '@/components/user/Uheader'
import Ufooter from '@/components/user/Ufooter'
import HotelInfo from '@/views/user/serve/HotelInfo.vue'
import RoomInfo from '@/views/user/serve/RoomInfo.vue'
import Revi from '@/views/user/serve/Revi.vue'
export default {
  name: 'userIndex',
  data() {
    return {}
  },
  components: {
    Uheader,
    HotelInfo,
    RoomInfo,
    Revi,
    Ufooter
  }
}
</script>

<style lang="less" scoped>
.container {
  background-color: #f5f7fa;
  .header {
    background-color: #fff;
    height: 70px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* 底部边框阴影效果 */
  }
  .hotel_info,
  .room_info,
  .revi,
  .footer {
    margin-top: 20px;
    // background-color: #fff;
  }
  .footer {
    background-color: #fff;
  }
}
.wrapper {
  width: 1160px;
  margin: 0 auto;
  background-color: #fff;
}
</style>
