<template>
  <div class="container">
    <div class="resv">
      <div class="title">酒店预定</div>
      <ul>
        <li><a href="">企业客户申请</a></li>
        <li><a href="">地图预定</a></li>
        <li><a href="">目录预定</a></li>
      </ul>
    </div>
    <div class="cooperate">
      <div class="title">加盟合作</div>
      <ul>
        <li><a href="">项目开源</a></li>
        <li><a href="">加盟必读</a></li>
      </ul>
    </div>
    <div class="about">
      <div class="title">关于翔鹭</div>
      <ul>
        <li><a href="">关于翔鹭</a></li>
        <li><a href="">联系我们</a></li>
        <li><a href="">隐私政策</a></li>
        <li><a href="">安全中心</a></li>
        <li><a href="">诚聘英才</a></li>
      </ul>
    </div>
    <div class="codePhone">
      <div class="code">
        <img src="@/assets/ceshiCode.png" alt="" />
      </div>
      <p>酒店预订电话</p>
      <p class="photoText">1314-666-666</p>
      <p>24小时服务电话，免长话费，全年无休</p>
    </div>
  </div>
</template>

<script>
export default { name: 'userFooter' }
</script>

<style lang="less" scoped>
.container {
  background-color: #fff !important;
  padding: 20px;
  display: flex;
  text-align: center;
  .resv,
  .cooperate,
  .about {
    flex: 1;
    border-right: 1px solid #dadfe6;
    .title {
      color: #333333;
      font-size: 20px;
      font-weight: 500;
      line-height: 24px;
      margin-bottom: 6px;
    }
    a {
      font-size: 14px;
      color: #666666;
    }
  }
  .codePhone {
    flex: 1;
    img {
      width: 150px;
      height: 150px;
    }
    p {
      font-size: 14px;
      color: #666666;
    }
    .photoText {
      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333;
      margin-top: 0.1rem rem;
    }
  }
}
</style>
