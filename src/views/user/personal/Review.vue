<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>点评</span>
      </div>
      <!-- 表格数据 -->
      <div class="table">
        <el-table
          :data="tableData"
          style="width: 100%"
          header-row-class-name="active-header"
        >
          <el-table-column prop="username" label="用户名" align="center">
          </el-table-column>
          <el-table-column
            prop="room_name"
            label="客房名称"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="date" label="入住日期" align="center">
          </el-table-column>
          <el-table-column prop="phone" label="电话" align="center">
          </el-table-column>
          <el-table-column prop="state" label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                :type="scope.row.state === '待点评' ? 'primary' : 'success'"
                :disabled="scope.row.state === '已点评'"
                class="btn"
                @click="handleEdit(scope.row)"
              >
                {{ scope.row.state }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
    </el-card>

    <!-- 对话框 -->
    <el-dialog
      title="用户点评"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <el-form ref="boxForm" :model="boxForm" label-width="80px">
        <div style="display: flex">
          <el-form-item label="用户名">
            <el-input v-model="boxForm.username"></el-input>
          </el-form-item>
          <el-form-item label="房间类型">
            <el-input v-model="boxForm.room_name"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="入住时间">
          <el-input v-model="boxForm.date"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="boxForm.phone"></el-input>
        </el-form-item>

        <div style="display: flex">
          <el-form-item label="点评时间">
            <el-input v-model="boxForm.checkinDate"></el-input>
          </el-form-item>
          <el-form-item label="点评等级">
            <el-select v-model="boxForm.rating" placeholder="请选择评分">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <el-form-item label="点评内容">
          <el-input type="textarea" v-model="boxForm.comment"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="boxSubmit">确 定</el-button>
      </span>
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
      // form: {}, //表单
      pagenum: 1,
      pagesize: 4,
      total: 0, //数据总条数
      avatar: '',
      boxForm: {
        username: '', // 用户名
        room_name: '', // 客房名称
        date: '', // 入住日期
        phone: '', //电话
        rating: '', //点评等级
        checkinDate: '', // 发表点评时间
        comment: '', // 点评内容
        avatar: '' //用户头像
      }
    }
  },
  mounted() {
    // 获取预定信息表
    this.getUserRevi()

    this.getUserAvatar()
  },
  computed: {},
  // 监听
  watch: {
    centerDialogVisible() {
      let currentDate = new Date()
      const year = currentDate.getFullYear() // 获取年份
      const month = currentDate.getMonth() + 1 // 获取月份（注意需要加1，因为月份是从0开始计数的）
      const day = currentDate.getDate() // 获取日期

      const formattedMonth = (month < 10 ? '0' : '') + month // 格式化月份，保证为两位数
      const formattedDay = (day < 10 ? '0' : '') + day // 格式化日期，保证为两位数

      this.boxForm.checkinDate = `${year}-${formattedMonth}-${formattedDay}`
    }
  },
  methods: {
    // 对应用户点评数据
    async getUserRevi() {
      const { data: res } = await this.$http.get('/user/getUserRevi', {
        params: {
          phone: this.$store.state.userPhone
        }
      })
      // console.log(res)
      // this.total = res.total
      // this.$store.commit('editRoom/aroomTotal', this.total)
      if (res.status === 200) {
        this.tableData = res.data
      }
    },

    // 获取用户头像
    async getUserAvatar() {
      const { data: res } = await this.$http.get('/user/getUserAvatar', {
        params: {
          phone: '123'
        }
      })
      if (res.status === 200) {
        this.avatar = res.avatar
        console.log(this.boxForm.avatar)
      } else {
        console.log(res)
      }
    },

    // 改变第几页
    // handleCurrentChange(val) {
    //   this.pagenum = val
    //   this.getUserRevi()
    // },

    // 点评
    handleEdit(row) {
      // console.log(row)
      this.centerDialogVisible = true
      this.boxForm = row
    },

    // 弹出框提交
    boxSubmit() {
      this.boxForm.avatar = this.avatar
      console.log(this.boxForm)
      this.$confirm('确定点评吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      })
        .then(async () => {
          console.log(this.boxForm)
          const { data: res } = await this.$http.post(
            '/user/insertRevi',
            this.boxForm
          )
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '点评成功!'
            })
            this.centerDialogVisible = false
            const { data: resState } = await this.$http.patch(
              '/user/changeState',
              {
                state: '已点评',
                phone: this.boxForm.phone
              }
            )
            if (resState.status === 200) {
              this.getUserRevi()
            }
          } else {
            this.$message({
              type: 'erroe',
              message: '点评失败!'
            })
          }
        })
        .catch(() => {})
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
