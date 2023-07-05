<template>
  <div class="container">
    <div class="title">
      <div class="left">
        <div class="hotel—title">南京翔鹭大酒店</div>
        <div class="introduce">
          <i class="iconfont icon-daohangdizhi"></i>
          中国，江苏，南京，溧水区，永阳镇天生桥大道280号南方新城4幢10室
        </div>
        <div class="introduce">
          开业：2019
          酒店提供卓越的品质、亲切入微的服务以及精心品质之上的生活体验。
        </div>
      </div>
      <div class="right">
        <s>¥256</s> <span>¥182</span> 起 <button>选择房间</button>
      </div>
    </div>
    <div class="moreImg">
      <div class="left">
        <img src="@/assets/img/big.png" alt="" />
      </div>
      <ul>
        <li><img src="@/assets/img/b1.png" alt="" /></li>
        <li><img src="@/assets/img/b2.png" alt="" /></li>
        <li><img src="@/assets/img/b3.png" alt="" /></li>
        <li><img src="@/assets/img/b4.png" alt="" /></li>
        <li><img src="@/assets/img/b5.png" alt="" /></li>
        <li><img src="@/assets/img/b6.png" alt="" /></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hotelInfo',
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
  background-color: #fff !important;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      .hotel—title {
        font-size: 25px;
        font-weight: 700;
        color: #0f294d;
        margin-bottom: 5px;
      }
      .introduce {
        font-size: 14px;
        color: #455873;
        margin-bottom: 8px;
      }
    }

    .right {
      s {
        font-size: 14px;
        color: #455873;
      }
      span {
        font-weight: 700;
        font-size: 24px;
        color: #287dfa;
        text-align: right;
      }
      button {
        padding: 10px 16px;
        background: #287dfa;
        border-radius: 3px;
        color: #fff;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        border: none;
      }
    }
  }
  .moreImg {
    display: flex;
    .left {
      margin-right: 6px;
      img {
        width: 457px;
        height: 300px;
        border-radius: 5px;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 215px;
        height: 148px;
        margin-right: 6px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
        &:nth-child(3n) {
          margin-right: 0;
        }
        &:nth-child(4),
        &:nth-child(5),
        &:nth-child(6) {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
