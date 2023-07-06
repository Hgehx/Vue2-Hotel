<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>我的订单</span>
      </div>
      <!-- 表格数据 -->
      <div class="table">
        <el-table
          :data="tableData"
          style="width: 100%"
          header-row-class-name="active-header"
        >
          <el-table-column
            prop="room_name"
            label="客房名称"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="room_info" label="介绍" align="center">
            <template slot-scope="scope">
              {{ scope.row.room_info }}
              <span
                style="color: #409eff; cursor: pointer"
                @click="moreIntroduction(scope.row)"
                >更多></span
              ></template
            >
          </el-table-column>
          <el-table-column prop="" label="总额" align="center">
            280
          </el-table-column>
          <el-table-column prop="" label="状态" align="center">
            待入住
          </el-table-column>
          <el-table-column prop="room_name" label="操作" align="center">
            <button
              type="primary"
              icon="el-icon-edit"
              class="btn"
              @click="handleEdit(scope.row)"
            >
              取消预定
            </button>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="block">
        <div class="left">
          <el-pagination
            :page-size="pagesize"
            @current-change="handleCurrentChange"
            layout="total, prev, pager, next"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>

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
  </div>
</template>

<script>
export default {
  name: 'roomOrder',
  components: {},
  data() {
    return {
      centerDialogVisible: false,
      tableData: [], //表格数据
      form: {}, //表单
      pagenum: 1,
      pagesize: 3,
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

  // 监听
  watch: {},
  methods: {
    // 获取预定信息数据
    async getRoom() {
      const { data: res } = await this.$http.get('/admin/roomInfo', {
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      // console.log(res)
      this.total = res.total
      this.$store.commit('editRoom/aroomTotal', this.total)
      this.tableData = res.data
    },

    // 更多介绍
    async moreIntroduction(row) {
      // this.$store.commit('editRoom/aroomMid', row.room_id)
      console.log(row.room_id)
      this.centerDialogVisible = true
      const { data: res } = await this.$http.get('/admin/idMore', {
        params: {
          room_id: row.room_id
        }
      })
      if (res.status === 200) {
        console.log(res.data[0])
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
    handleEdit(row) {
      console.log(row)
      this.$router.push('/resv')
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  .clearfix {
    font-size: 25px;
  }

  .table {
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
    }
    .btn {
      width: 80px;
      height: 40px;
      line-height: 40px;
      margin-right: 10px;
      border: none;
      background-color: #f56c6c;
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      border-radius: 5px;
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
