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
              <el-button class="btn" @click="handleEdit(scope.row)">
                {{ scope.row.state }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'roomOrder',
  components: {},
  data() {
    return {
      tableData: [], //表格数据
      state: '取消'
    }
  },
  mounted() {
    // 获取预定信息表
    this.getResvInfo()
  },

  // 监听
  watch: {},
  methods: {
    // 获取用户预定信息数据
    async getResvInfo() {
      const { data: res } = await this.$http.get('/user/resvInfo', {
        params: {
          phone: this.$store.state.userPhone
        }
      })
      // console.log(res)
      this.tableData = res.data
      this.tableData.forEach(item => {
        console.log('mounted() is called') // 添加这一行进行调试
        this.stateChange(item.date) // 根据每个数据项的日期调用 stateChange() 方法
      })
    },

    // 判断状态
    async stateChange(date) {
      console.log(date)
      const currentDate = new Date()
      // 提取入住日期
      if (date) {
        const extractedDate1 = new Date(date.split(' ~ ')[0])
        const extractedDate2 = new Date(date.split(' ~ ')[1])
        // 将时间部分设置为 00:00:00
        currentDate.setHours(0, 0, 0, 0)
        if (currentDate >= extractedDate1 && currentDate <= extractedDate2) {
          // 当前时间在入住时间内
          this.state = '联系客服'
        } else if (currentDate < extractedDate1) {
          // 当前时间没到入住时间
          this.state = '取消预定'
        } else if (currentDate > extractedDate2) {
          // 当前时间超过了退房时间
          this.state = '点评'
        }
      }
      const { data: res } = await this.$http.patch('/user/stateChange', {
        phone: this.$store.state.userPhone,
        state: this.state,
        date
      })
      if (res.status === 200) {
        console.log(res)
      }
    },
    handleEdit(row) {
      if (row.state === '点评') {
        this.$router.push('/personal/review')
      }
      if (row.state === '取消预定') {
        // 预定表单中删除用户信息
        this.$confirm('确定取消预定吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            // 删除数据
            const { data: resdel } = await this.$http.delete('/admin/resvDel', {
              params: {
                id: row.id
              }
            })

            //  // 退房， 对客房数量+1
            const { data: resnum } = await this.$http.patch(
              '/admin/updateNum',
              {
                room_name: row.room_name,
                operation: 'add'
              }
            )

            if (resdel.status === 200 && resnum.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getResvInfo()
            } else {
              this.$message({
                type: 'error',
                message: '删除失败'
              })
            }
          })
          .catch(() => {})
      }
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
    // .btn {
    //   width: 80px;
    //   height: 40px;
    //   line-height: 40px;
    //   margin-right: 10px;
    //   border: none;
    //   background-color: #f56c6c;
    //   color: #fff;
    //   font-size: 16px;
    //   font-weight: 700;
    //   border-radius: 5px;
    // }
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
