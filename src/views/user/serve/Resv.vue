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
              <h4>{{ form.room_name }}</h4>
              <h4>价格：￥{{ form.price }}</h4>
              <div class="room_more">
                <div class="iconInfo" v-html="moreInfo.baseinfo"></div>
                <div>
                  <h4>食品饮品:</h4>
                  {{ moreInfo.foot }}
                </div>
                <div>
                  <h4>费用政策:</h4>
                  {{ moreInfo.policy }}
                </div>
                <div>
                  <h4>便利设施:</h4>
                  {{ moreInfo.facilities }}
                </div>
                <div>
                  <h4>洗浴配套：</h4>
                  {{ moreInfo.bathroom }}
                </div>
                <div>
                  <h4>洗浴用品:</h4>
                  {{ moreInfo.bathing }}
                </div>
              </div>
            </div>
          </div>
          <div class="resvinfo">
            <h3>预约</h3>
            <el-form
              ref="resvForm"
              :model="resvForm"
              label-width="70px"
              :rules="rules"
            >
              <el-form-item label="日期" prop="date">
                <div class="block">
                  <el-date-picker
                    v-model="date"
                    type="daterange"
                    start-placeholder="入住日期"
                    end-placeholder="退房日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    :clearable="false"
                  >
                  </el-date-picker>
                </div>
              </el-form-item>
              <h5>住客资料</h5>
              <el-form-item label="住客姓名">
                <el-input
                  v-model="resvForm.username"
                  placeholder="请输入用户名"
                ></el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input
                  v-model="resvForm.phone"
                  placeholder="请输入电话"
                ></el-input>
              </el-form-item>
              <el-form-item label="电子邮箱">
                <el-input
                  v-model="resvForm.email"
                  placeholder="电子邮箱(选填)"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit('resvForm')"
                  >支付</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="right">
          <div class="days">
            <p>1间 × {{ (diffDays = nightNum) }}晚</p>
            <p>￥{{ oldTotal }}</p>
          </div>
          <div class="subsidy">
            <p>百亿补贴</p>
            <p class="subsidyNum">-￥{{ moreInfo.preferential }}</p>
          </div>
          <div class="price">
            <p>应付总额</p>
            <p class="priceNum">￥{{ (this.resvForm.price = total) }}</p>
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
          <div class="divider"></div>
          <div>
            <el-popover
              placement="top-start"
              title="客服电话："
              width="200"
              trigger="hover"
              content="1314-666-666"
            >
              <el-button class="serve" slot="reference"
                ><i class="iconfont icon-kefu"></i>咨询客服</el-button
              >
            </el-popover>
          </div>
          <div class="divider"></div>
          <div><span class="back" @click="$router.back()">返回首页</span></div>
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
  computed: {
    nightNum() {
      const date1 = new Date(this.date[0])
      const date2 = new Date(this.date[1])
      // 计算天数差异
      const diffTime = Math.abs(date2.getTime() - date1.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      // console.log(`相差天数：${diffDays}`)
      return diffDays || 1
    },

    // 应付总额
    total() {
      return this.form.price * this.diffDays - this.moreInfo.preferential
    },

    // 优惠之前的总额
    oldTotal() {
      return this.form.price * this.diffDays || this.form.price
    }
  },
  watch: {
    diffDays() {
      this.resvForm.date = this.date[0] + ' ~ ' + this.date[1]
    }
  },
  data() {
    var validateDate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择日期'))
      } else {
        const currentDate = new Date()
        // 提取前一个日期
        const extractedDate = new Date(this.resvForm.date.split(' ~ ')[0])
        // 将时间部分设置为 00:00:00
        currentDate.setHours(0, 0, 0, 0)
        if (currentDate <= extractedDate) {
          callback()
        } else {
          callback(new Error('请选择大于等于当前的日期'))
        }
      }
    }
    return {
      datevalue: '',
      form: this.$store.state.editRoom.uroom_info,
      moreInfo: {},
      diffDays: 1, //几晚
      date: '',
      resvForm: {
        username: '', //用户名
        phone: '', // 电话
        price: 1, // 价格
        date: '', // 时间
        room_name: '', //客房名称
        email: '' // 邮箱
      },
      rules: {
        date: [{ validator: validateDate, trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.getRoomMore()
    this.resvForm.room_name = this.form.room_name
  },
  methods: {
    // 获取更多信息
    async getRoomMore() {
      const { data: res } = await this.$http.get('/admin/idMore', {
        params: {
          room_id: this.form.room_id
        }
      })
      if (res.status === 200) {
        // console.log(res.data[0])
        this.moreInfo = res.data[0]
      } else {
        console.log('获取失败')
      }
    },

    // 支付按钮
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm(
            `入住时间：${this.resvForm.date}<br>应付金额：${this.resvForm.price}`,
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info',
              dangerouslyUseHTMLString: true // 配置项，用于告诉Vue.js确认对话框内容中包含HTML标签
            }
          )
            .then(async () => {
              // 预约信息添加
              const { data: res } = await this.$http.post(
                '/admin/resvAdd',
                this.resvForm
              )
              // 预约。对客房数量进行-1
              const { data: resnum } = await this.$http.patch(
                '/admin/updateNum',
                {
                  room_name: this.resvForm.room_name,
                  operation: 'reduce'
                }
              )
              // 对客房进行
              if (res.status === 200 && resnum.status === 200) {
                this.$message({
                  type: 'success',
                  message: '支付成功!'
                })
                // 支付成功跳转到订单页面
                this.$router.push('/personal/order')
              } else {
                this.$message({
                  type: 'success',
                  message: '支付失败!'
                })
              }
              console.log(this.resvForm)
            })
            .catch(() => {})
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
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
        .roomMore {
          .iconInfo {
            display: flex;
            justify-content: space-between;
            /deep/.iconfont {
              margin-right: 5px;
            }
          }
          div {
            margin: 5px 0;
          }
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
        height: 600px;
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
        .serve {
          color: #5b78a8;
          cursor: pointer;
          .iconfont {
            margin-right: 5px;
          }
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
