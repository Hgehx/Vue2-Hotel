<template>
  <div class="container">
    <h3>客房信息</h3>
    <!-- 表格数据 -->
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        :show-header="false"
        header-row-class-name="active-header"
      >
        <el-table-column
          prop="room_name"
          label="客房名称"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column width="220" prop="photo" label="图片" align="center">
          <template slot-scope="scope">
            <el-popover
              placement="right"
              width="475"
              trigger="hover"
              :open-delay="700"
            >
              <img
                class="room_photo"
                width="450px"
                height="300px"
                :src="scope.row.photo"
                alt=""
              />
              <div slot="reference">
                <img class="room_photo" :src="scope.row.photo" alt="" />
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="room_info" label="介绍" align="center">
          <template slot-scope="scope">
            {{ scope.row.room_info }}
            <div
              style="color: #409eff; cursor: pointer"
              @click="moreIntroduction(scope.row)"
            >
              更多详情>
            </div></template
          >
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="priceBtn">
              价格：<span class="price">￥{{ scope.row.price }}</span>
              <div
                class="operate"
                :style="{
                  'padding-top': isAvailable(scope.row.room_num) ? '20px' : ''
                }"
              >
                <button
                  type="primary"
                  icon="el-icon-edit"
                  class="btn"
                  :class="{ btnintact: !scope.row.room_num }"
                  @click="handleEdit(scope.row, scope.row.room_num)"
                  style="cursor: pointer"
                >
                  {{ !scope.row.room_num ? '售完' : '预约' }}
                </button>
                <div
                  style="color: red"
                  v-show="isAvailable(scope.row.room_num)"
                >
                  仅剩{{ scope.row.room_num }}间
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 客房更多信息 -->
    <el-dialog
      title="更多信息"
      :visible.sync="centerDialogVisible"
      width="45%"
      center
    >
      <span class="roomMore" v-html="roomMore.baseinfo"></span>
      <h4>食品饮品</h4>
      <span v-html="roomMore.foot"></span>
      <h4>费用政策</h4>
      <span v-html="roomMore.policy"></span>
      <h4>便利设施</h4>
      <span v-html="roomMore.facilities"></span>
      <h4>洗浴配套</h4>
      <span v-html="roomMore.bathroom"></span>
      <h4>洗浴用品</h4>
      <span v-html="roomMore.bathing"></span>
    </el-dialog>

    <!-- 分页 -->
    <!-- <div class="block">
      <div class="left">
        <el-pagination
          :page-size="pagesize"
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'roomInfo',
  data() {
    return {
      centerDialogVisible: false,
      tableData: [], //表格数据
      form: {}, //表单
      pagenum: 1,
      pagesize: 100,
      total: 0, //数据总条数
      roomMore: {
        baseinfo: '', //更多信息
        bathing: '',
        bathroom: '',
        facilities: '',
        foot: '',
        policy: ''
      }
    }
  },
  mounted() {
    // 获取预定信息表
    this.getRoom()
  },
  computed: {},
  // 监听
  watch: {},
  methods: {
    // 判断预约模块内容
    isAvailable(roomNum) {
      return roomNum > 0 && roomNum <= 3
    },
    // 获取预定信息数据
    async getRoom() {
      const { data: res } = await this.$http.get('/admin/roomInfo', {
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      console.log(res)
      this.total = res.total
      this.$store.commit('editRoom/aroomTotal', this.total)
      this.tableData = res.data
    },

    // 更多介绍
    async moreIntroduction(row) {
      // this.$store.commit('editRoom/aroomMid', row.room_id)
      // console.log(row.room_id)
      this.centerDialogVisible = true
      const { data: res } = await this.$http.get('/admin/idMore', {
        params: {
          room_id: row.room_id
        }
      })
      if (res.status === 200) {
        // console.log(res.data[0])
        this.roomMore = res.data[0]
      } else {
        console.log(res)
      }
    },

    // 改变第几页
    handleCurrentChange(val) {
      this.pagenum = val
      this.getRoom()
    },

    // 预定
    handleEdit(row, num) {
      // console.log(row)
      if (num) {
        this.$store.commit('editRoom/uroomInfo', row)
        this.$router.push('/resv')
      } else {
        this.$message({
          type: 'error',
          message: '已售完！请选择其他房型'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
  background-color: #fff !important;
  h3 {
    padding-bottom: 5px;
    border-bottom: 1px solid #ebeef5;
  }
  .table {
    .room_photo {
      width: 200px;
      height: 120px;
      cursor: pointer;
    }
    .priceBtn {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .price {
        font-weight: 700;
        font-size: 24px;
        color: #287dfa;
        text-align: right;
        margin-right: 10px;
      }
      .operate {
        text-align: center;
        // padding-top: 20px;
        .btn {
          width: 80px;
          height: 40px;
          line-height: 40px;
          border: none;
          background-color: #ff9500;
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          border-radius: 5px;
        }
        .btnintact {
          background-color: #a1a1a1;
        }
      }
    }
  }
  .roomMore {
    /deep/.iconfont {
      font-size: 20px;
      margin-right: 10px;
    }
  }
  h4 {
    margin-top: 10px;
  }
  /deep/.active-header {
    color: #000;
  }
  .block {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  .date {
    margin-top: 10px;
  }
}
</style>
