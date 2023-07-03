<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户评价管理</span>
      </div>
      <!-- 头部搜索和添加 -->
      <div class="handle">
        筛选：
        <el-button type="warning" @click="noResponse">
          <i class="iconfont icon-weiwancheng"></i>未回复</el-button
        ><el-button type="success" @click="replied"
          ><i class="iconfont icon-wancheng"></i>已回复</el-button
        >
      </div>

      <!-- 表格数据 -->
      <div class="table">
        <el-table
          :data="tableData"
          :border="true"
          style="width: 100%"
          header-row-class-name="active-header"
        >
          <el-table-column prop="username" label="用户名"> </el-table-column>
          <el-table-column prop="photo" label="联系电话"> </el-table-column>
          <el-table-column prop="rating" label="评分"> </el-table-column>
          <el-table-column prop="date" label="日期"> </el-table-column>
          <el-table-column prop="comment" label="用户评价内容" width="300">
            <template slot-scope="scope">
              <el-popover
                placement="left-end"
                width="300"
                trigger="hover"
                :open-delay="300"
                :close-delay="0"
                :content="scope.row.comment"
              >
                <div class="ellipsis" slot="reference">
                  {{ scope.row.comment }}
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="admin_reply" label="酒店回复" width="300">
            <template slot-scope="scope">
              <el-popover
                placement="left-end"
                width="300"
                :open-delay="300"
                :close-delay="0"
                trigger="hover"
                :content="scope.row.admin_reply"
              >
                <div class="ellipsis" slot="reference">
                  {{ scope.row.admin_reply }}
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="handleEdit(scope.row)"
                >回复</el-button
              >
              <!-- <el-button
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
                >删除</el-button
              > -->
            </template>
          </el-table-column>
        </el-table>
        <!-- 弹出层 -->
        <el-dialog
          title="酒店回复"
          :visible.sync="centerDialogVisible"
          width="30%"
          center
        >
          <!-- 表单 -->
          <el-form ref="form" :model="form" label-width="120px">
            <el-input
              type="textarea"
              class="custom-input"
              v-model.trim="form.admin_reply"
              placeholder="请输入回复内容"
            ></el-input>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="formCancel">取 消</el-button>
            <el-button type="primary" @click="formSubmit()">确 定</el-button>
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
    return {
      tableData: [], //表格显示数据
      resData: [], //默认获取数据
      centerDialogVisible: false, //隐藏显示弹出层
      form: {
        id: 1,
        admin_reply: ''
      }, //弹出层表单
      pagenum: 1, //第几页
      pagesize: 8, // 一页显示几条数据
      total: 0, //数据总数
      isShow: false
    }
  },
  mounted() {
    // 获取用户评价
    this.getRevi()
  },

  // 监听
  watch: {
    // 对话框关闭刷新数据
    // centerDialogVisible(newVal) {
    //   if (newVal === false) {
    //     this.value = ''
    //     this.form = {}
    //   }
    // }
  },
  methods: {
    // 获取用户评价列表
    async getRevi() {
      const { data: res } = await this.$http.get('/admin/reviInfo', {
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      // console.log(res)
      this.total = res.total
      this.tableData = this.resData = res.data
    },

    // 未回复
    noResponse() {
      // 筛选酒店回复内容为空的数据展示
      this.isShow = true
      this.tableData = this.resData.filter(item => item.admin_reply === '')
    },

    // 已回复
    replied() {
      this.isShow = true
      this.tableData = this.resData.filter(item => item.admin_reply !== '')
    },

    // 右下角返回按钮
    back() {
      this.isShow = false
      this.getRevi()
    },

    // 改变第几页
    handleCurrentChange(val) {
      this.pagenum = val
      this.getRevi()
    },
    // 编辑按钮操作
    handleEdit(row) {
      this.centerDialogVisible = true
      // console.log('编辑id----', row.id)
      this.form.id = row.id
      const data = this.tableData.filter(obj => obj.id === row.id)
      this.form.admin_reply = data[0].admin_reply
    },
    // 删除按钮操作
    // handleDelete() {},

    // 弹出框表单提交
    async formSubmit() {
      if (this.form.admin_reply.trim() !== '') {
        const { data: res } = await this.$http.patch(
          '/admin/reviUpdate',
          this.form
        )
        if (res.status === 200) {
          this.$message({
            type: 'success',
            message: '回复成功!'
          })
          this.centerDialogVisible = false
          this.getRevi()
        } else {
          this.$message({
            type: 'error',
            message: '回复失败'
          })
        }
      } else {
        this.$message({
          type: 'error',
          message: '回复内容不能为空'
        })
      }
    },

    // 弹出层取消
    formCancel() {
      this.centerDialogVisible = false
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
    .el-button {
      font-size: 15px;
    }
    .iconfont {
      margin-right: 5px;
    }
  }
  .table {
    .ellipsis {
      width: 280px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  /deep/.active-header {
    color: #000;
  }
  /deep/.custom-input .el-textarea__inner {
    height: 300px; /* 设置你想要的高度 */
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
