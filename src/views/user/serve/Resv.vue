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
          <div class="baseinfo">
            <div class="hotel—title">南京翔鹭大酒店</div>
            <div class="introduce">
              <i class="iconfont icon-daohangdizhi"></i>
              中国，江苏，南京，溧水区，永阳镇天生桥大道280号南方新城4幢10室
            </div>
            <div class="roomMore">
              <div class="room_name">温馨大床房</div>
              <div class="room_more">
                <div>1张大床1.8米 30-35m 9层 飘窗 WIFI免费 禁烟 2人 无早餐</div>
                <div>
                  食品饮品: 瓶装水免费，冰箱免费，电热水壶，厨房免费，抽油烟机
                </div>
                <div>费用政策: 加床:该房型不可加床。停车场:有免费停车场</div>
                <div>
                  便利设施多种规格电源插座免费，单一规格电源插座,220V电压插座,遮光窗帘，手动窗帘,书桌，座椅，办公用品(笔、便签)，坐卧两用长沙发，床具:鸭绒被,床具:毯子或被子，针线包免费，衣柜/衣橱,，空调免费，独立空调，暖气，洗衣机，房间内高速上网，客房WiFi免费，洗衣用品免费，衣架，茶几，餐桌，一次性拖鞋，一次性漱口杯，一次性毛巾免费
                </div>
                <div>
                  洗浴配套：
                  独立卫生间，24小时热水，电热水器，独立淋浴间，吹风机，拖鞋，浴巾，浴室化妆放大镜免费，卫生纸
                </div>
                <div>
                  洗浴用品
                  牙刷,牙膏,洗发水，沐浴露，护发素，浴帽,香皂，梳子，剃须刀，毛巾
                </div>
              </div>
            </div>
          </div>
          <div class="resvinfo">
            <h3>预约</h3>

            <el-form ref="form" :model="form" label-width="70px">
              <el-form-item label="日期">
                <div class="block">
                  <el-date-picker
                    v-model="datevalue"
                    type="daterange"
                    start-placeholder="入住日期"
                    end-placeholder="退房日期"
                    :default-time="['00:00:00', '23:59:59']"
                  >
                  </el-date-picker>
                </div>
              </el-form-item>
              <h5>住客资料</h5>
              <el-form-item label="住客姓名">
                <el-input
                  v-model="form.username"
                  placeholder="请输入用户名"
                ></el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input
                  v-model="form.phone"
                  placeholder="请输入电话"
                ></el-input>
              </el-form-item>
              <el-form-item label="电子邮箱">
                <el-input
                  v-model="form.name"
                  placeholder="电子邮箱(选填)"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">支付</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="right">
          <div class="days">
            <p>1间 × 1晚</p>
            <p>￥345</p>
          </div>
          <div class="subsidy">
            <p>百亿补贴</p>
            <p class="subsidyNum">-￥345</p>
          </div>
          <div class="price">
            <p>应付总额</p>
            <p class="priceNum">￥256</p>
          </div>

          <div class="divider"></div>
          <div class="timeCancel">
            <div class="title">限时取消</div>
            <div>
              入住当天18:00前可免费取消。逾期不可取消，若未入住将收取您首晚房费（如用优惠券则以券后支付价为准）。订单需等酒店或供应商确认后生效，订单确认结果以短信、邮件通知为准，如订单不确认将全额退款至您的付款账户。
            </div>
          </div>
          <div class="divider"></div>
          <div class="illustrate">
            <div class="title">说明</div>
            <div>
              预订服务由携程旗下翔鹭有限公司及其分公司提供、住宿服务由酒店提供，交易款项由商家委托翔鹭旗下子公司统一收取。
            </div>
          </div>
          <div class="back" @click="$router.back()">返回首页</div>
        </div>
      </div>
    </div>
    <Ufooter></Ufooter>
  </div>
</template>

<script>
import Ufooter from '@/components/user/Ufooter.vue'
import Uheader from '@/components/user/Uheader.vue'
export default {
  name: 'userResv',
  components: { Uheader, Ufooter },
  data() {
    return {
      datevalue: '',
      form: {
        username: '',
        region: '1',
        phone: ''
      }
    }
  },
  methods: {
    // 支付按钮
    onSubmit() {}
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
  .content {
    margin-top: 20px;
    margin-bottom: 20px;
    .wrapper {
      display: flex;
      .left {
        background-color: #f5f7fa;
        .baseinfo {
          width: 768px;
          margin-right: 16px;
          padding: 20px;
          background-color: #fff;
          .hotel—title {
            font-size: 25px;
            font-weight: 700;
            color: #0f294d;
            margin-bottom: 5px;
          }
        }
        .introduce {
          font-size: 14px;
          color: #455873;
          margin-bottom: 8px;
        }
        .resvinfo {
          width: 768px;
          padding: 20px;
          background-color: #fff;
          margin-top: 10px;
          h3,
          h5 {
            padding-bottom: 5px;
            margin-bottom: 10px;
            border-bottom: 1px solid #ebeef5;
          }
          h5 {
            border-bottom: none;
          }
          .el-input {
            width: 250px;
          }
        }
      }

      .right {
        width: 376px;
        background-color: #fff;
        height: 465px;
        padding: 20px;
        .days,
        .subsidy,
        .price {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .subsidy {
          .subsidyNum {
            color: #ff6f00;
          }
        }
        .price {
          font-weight: 700;
          p {
            font-size: 24px;
            color: #0f294d;
            line-height: 30px;
          }
          .priceNum {
            color: #287dfa;
          }
        }
        .divider {
          border-top: 1px dashed #e5e5e5;
          margin-top: 30px;
          margin-bottom: 20px;
        }
        .timeCancel {
          .title {
            color: #06aebd;
            font-weight: 700;
            font-size: 16px;
            margin-bottom: 5px;
          }
          font-size: 14px;
          color: #8592a6;
        }
        .illustrate {
          .title {
            font-weight: 700;
            font-size: 16px;
            color: #0f294d;
            margin-bottom: 5px;
          }
          font-size: 14px;
          color: #8592a6;
        }
        .back {
          color: #287dfa;
          margin-top: 20px;
          cursor: pointer;
        }
      }
    }
  }
}
.wrapper {
  width: 1160px;
  margin: 0 auto;
}
</style>
