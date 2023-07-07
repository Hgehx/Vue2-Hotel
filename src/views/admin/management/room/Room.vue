<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="left">
          <span>客房信息管理</span>
        </div>
        <div class="right">
          <el-button
            type="primary"
            icon="el-icon-plus"
            class="roomAdd"
            @click="roomvAdd"
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
          <el-table-column prop="room_name" label="客房名称" width="180">
          </el-table-column>
          <el-table-column width="220" prop="photo" label="图片">
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
          <el-table-column prop="room_info" label="介绍">
            <template slot-scope="scope">
              {{ scope.row.room_info }}
              <span
                style="color: #409eff; cursor: pointer"
                @click="moreIntroduction(scope.row)"
                >更多></span
              ></template
            >
          </el-table-column>
          <el-table-column prop="price" label="价格"> </el-table-column>
          <el-table-column prop="room_num" label="客房余量"> </el-table-column>
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
  </div>
</template>

<script>
export default {
  name: 'adminRoom',
  data() {
    return {
      tableData: [], //表格数据
      form: {}, //表单
      pagenum: 1,
      pagesize: 4,
      total: 0, //数据总条数
      isShow: false
    }
  },
  mounted() {
    // 获取预定信息表
    this.getRoom()
  },

  // 监听
  watch: {},
  methods: {
    // 新增预定信息
    async roomvAdd() {
      this.$store.commit('editRoom/aroomEdit', '新增')
      this.$router.push('/admin/room/roomedit')
    },
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
    moreIntroduction(row) {
      this.$router.push('/admin/room/rmore')
      this.$store.commit('editRoom/aroomMid', row.room_id)
    },

    // 改变第几页
    handleCurrentChange(val) {
      this.pagenum = val
      this.getRoom()
    },
    // 编辑按钮操作
    handleEdit(row) {
      // console.log(row)
      this.$store.commit('editRoom/aroomId', row.id)
      this.$store.commit('editRoom/aroomEdit', '编辑')
      this.$router.push('/admin/room/roomedit')
    },
    // 删除按钮操作
    handleDelete(row) {
      // console.log('删除信息id----', row.room_name)
      this.$confirm('确定删除该客户信息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 删除数据
          const { data: resdel } = await this.$http.delete('/admin/delRoom', {
            params: {
              id: row.id
            }
          })

          if (resdel.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            if (this.input) {
              this.input = ''
            } else if (this.total % this.pagesize === 1) {
              this.handleCurrentChange(this.pagenum - 1)
            }
            this.getRoom()
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
</script>

<style lang="less" scoped>
.container {
  .clearfix {
    font-size: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right {
      margin-right: 20px;
    }
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
  .table {
    .room_photo {
      width: 200px;
      height: 120px;
      cursor: pointer;
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
