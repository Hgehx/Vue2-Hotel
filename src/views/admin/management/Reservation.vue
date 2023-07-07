<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>预定信息管理</span>
      </div>
      <!-- 头部搜索和添加 -->
      <div class="handle">
        <div class="left">
          <el-input v-model="input" placeholder="查询客户信息"></el-input
          ><el-button
            class="search-btn"
            type="primary"
            @click="searchSubmit"
            :disabled="!input"
            >搜索</el-button
          >
        </div>
        <div class="right">
          <el-button
            type="primary"
            icon="el-icon-plus"
            class="resvAdd"
            @click="resvAdd"
            >新增</el-button
          >
        </div>
      </div>

      <!-- 表格数据 -->
      <div class="table">
        <el-table
          :data="tableData"
          :border="true"
          style="width: 100%"
          header-row-class-name="active-header"
        >
          <el-table-column prop="username" label="客户名称" width="180">
          </el-table-column>
          <el-table-column prop="room_name" label="订购房间类型">
          </el-table-column>
          <el-table-column prop="price" label="价格"> </el-table-column>
          <el-table-column prop="phone" label="电话"> </el-table-column>
          <el-table-column prop="date" label="预定日期"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 弹出层 -->
        <el-dialog
          :title="title"
          :visible.sync="centerDialogVisible"
          width="40%"
          center
        >
          <!-- 表单 -->
          <el-form ref="form" :model="form" label-width="120px" :rules="rules">
            <el-form-item label="客户名称">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="订购房间类型">
              <el-input v-model="form.room_name"></el-input>
            </el-form-item>
            <el-form-item label="价格">
              <el-input v-model="form.price"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="预定日期" prop="date">
              <el-input v-model="form.date"></el-input>
              <div class="date">
                <el-date-picker
                  v-model="value"
                  type="daterange"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </div>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="formCancel">取 消</el-button>
            <el-button type="primary" @click="formSubmit(category, 'form')"
              >确 定</el-button
            >
          </span>
        </el-dialog>
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
        <div class="right" v-show="isShow">
          <el-button type="success" size="small" @click="back">返回</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'adminReservation',
  data() {
    var validateDate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择日期'))
      } else {
        const currentDate = new Date()
        // 提取前一个日期
        if (this.form.date) {
          const extractedDate = new Date(this.form.date.split(' ~ ')[0])
          // 将时间部分设置为 00:00:00
          currentDate.setHours(0, 0, 0, 0)
          if (currentDate <= extractedDate) {
            callback()
          } else {
            callback(new Error('请选择大于等于当前的日期'))
          }
        } else {
          callback(new Error('请选择日期'))
          this.centerDialogVisible = true
        }
      }
    }
    return {
      tableData: [], //表格数据
      centerDialogVisible: false, //隐藏显示弹出层
      form: {}, //弹出层表单
      date: '',
      title: '', // 弹出层标题
      category: '', // 弹出层操作类型
      value1: '', //入住时间
      value2: '', // 退房时间
      input: '', //搜索框内容
      pagenum: 1,
      pagesize: 8, //每页显示条数
      total: 0, //数据总条数
      isShow: false, //弹出层
      value: '',
      rules: {
        date: [{ validator: validateDate, trigger: 'blur' }]
      }
    }
  },
  mounted() {
    // 获取预定信息表
    this.getResv()
  },

  // 监听
  watch: {
    input(newVal) {
      if (!newVal) {
        this.isShow = false
      }
    },
    value(newVal) {
      this.form.date = newVal[0] + ' ~ ' + newVal[1]
    },
    // 对话框关闭刷新数据
    centerDialogVisible(newVal) {
      if (newVal === false) {
        this.value = ''
        this.form = {}
      }
      // this.getResv()
    }
  },
  methods: {
    // 搜索点击
    async searchSubmit() {
      this.isShow = true // 返回按钮显示
      const { data: res } = await this.$http.get('/admin/resvUser', {
        params: {
          username: this.input
        }
      })
      if (res.status === 200) {
        this.tableData = res.data
        this.total = res.data.length
      } else {
        this.$message({
          type: 'error',
          message: `数据不存在`
        })
        this.input = ''
        this.getResv()
      }
    },
    // 新增预定信息
    async resvAdd() {
      this.centerDialogVisible = true
      this.title = '新增客户预定信息'
      this.category = '新增'
    },
    // 获取预定信息数据
    async getResv() {
      const { data: res } = await this.$http.get('/admin/resvInfo', {
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      // console.log(res)
      this.total = res.total
      this.tableData = res.data
    },

    // 改变第几页
    handleCurrentChange(val) {
      this.pagenum = val
      this.getResv()
    },
    // 编辑按钮操作
    handleEdit(row) {
      this.centerDialogVisible = true
      // console.log('编辑id----', row.id)
      this.title = '编辑客户预定信息'
      this.category = '编辑'
      this.form = row
      const dateStr = row.date.split('~')
      this.value1 = dateStr[0]
      this.value2 = dateStr[1]
    },

    // 删除按钮操作
    handleDelete(row) {
      // console.log('删除信息id----', row.id)
      this.$confirm('确定删除该客户信息吗?', '提示', {
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
          const { data: resnum } = await this.$http.patch('/admin/updateNum', {
            room_name: row.room_name,
            operation: 'add'
          })

          if (resdel.status === 200 && resnum.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            if (this.input) {
              this.input = ''
            } else if (this.total % this.pagesize === 1) {
              this.handleCurrentChange(this.pagenum - 1)
            }
            this.getResv()
          } else {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          }
        })
        .catch(() => {})
    },

    // 弹出框表单提交
    async formSubmit(category, formName) {
      this.centerDialogVisible = false
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 获取对应数据id
          // console.log(this.form.id)
          if (category == '编辑') {
            if (this.input) {
              this.input = this.form.username
            }
            await this.$http.patch('/admin/resvUpdate', this.form)
            this.$message({
              type: 'success',
              message: '更新数据成功'
            })
          } else {
            // console.log('进行新增操作')
            let room_name = ''
            if (this.form.room_name) {
              room_name = this.form.room_name
            }
            const { data: res } = await this.$http.post(
              '/admin/resvAdd',
              this.form
            )
            // 预约。对客房数量进行-1
            const { data: resnum } = await this.$http.patch(
              '/admin/updateNum',
              {
                room_name,
                operation: 'reduce'
              }
            )
            console.log(resnum)
            if (res.status === 200 && resnum.status === 200) {
              this.$message({
                type: 'success',
                message: '新增数据成功'
              })
            } else {
              this.$message({
                type: 'error',
                message: '新增数据失败'
              })
            }
          }
          if (this.input) {
            this.searchSubmit()
          } else {
            this.getResv()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 弹出层取消
    formCancel() {
      this.centerDialogVisible = false
      if (this.input) {
        this.searchSubmit()
      }
    },
    // 返回重新获取数据
    back() {
      this.getResv()
      this.isShow = false //返回按钮隐藏
      this.input = ''
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  .clearfix {
    font-size: 25px;
  }
  .handle {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      .search-btn {
        margin-left: 5px;
      }
    }
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
