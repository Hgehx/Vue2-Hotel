<template>
  <div class="container">
    <h3>用户点评</h3>
    <el-table
      :data="tableData"
      :border="false"
      style="width: 100%"
      :show-header="false"
    >
      <el-table-column>
        <template slot-scope="scope">
          <div class="content">
            <div class="left">
              <div class="left_flex">
                <div class="imgPhoto">
                  <img
                    :src="
                      scope.row.avatar ||
                      'https://s1.ax1x.com/2023/06/30/pCBFz6J.png'
                    "
                    alt=""
                  />
                  <span class="username">{{ scope.row.username }}</span>
                </div>
                <div class="icon_flex">
                  <i class="iconfont icon-chuang"></i>{{ scope.row.room_name }}
                </div>
                <div class="icon_flex">
                  <i class="iconfont icon-riqi"></i>于{{
                    scope.row.date.split('~')[0].trim()
                  }}入住
                </div>
              </div>
            </div>
            <div class="right">
              <div class="rating">
                <span>{{ scope.row.rating }}</span
                >/ 5
              </div>
              <div class="comment">
                {{ scope.row.comment }}
              </div>
              <!-- <div class="photo"><img src="@/assets/img/b1.png" alt="" /></div> -->
              <div class="date">{{ scope.row.checkinDate }} 发表</div>
              <div class="admin_reply">
                <h4>酒店回复</h4>
                <div class="reply">
                  {{ scope.row.admin_reply }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
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
  </div>
</template>

<script>
export default {
  name: 'userRevi',
  data() {
    return {
      tableData: [],
      pagenum: 1,
      pagesize: 4, //每页显示条数
      total: 0 //数据总条数
    }
  },
  mounted() {
    this.getUserRevi()
  },
  methods: {
    // 获取用户点评列表
    async getUserRevi() {
      const { data: res } = await this.$http.get('/admin/reviInfo', {
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      if (res.status === 200) {
        this.tableData = res.data.reverse()
        this.total = res.total
      }
    },
    // 改变第几页
    handleCurrentChange(val) {
      this.pagenum = val
      this.getUserRevi()
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  background-color: #fff !important;
  padding: 20px;
  h3 {
    padding-bottom: 5px;
    border-bottom: 1px solid #ebeef5;
  }

  ::v-deep .el-table__body tr:hover > td {
    background-color: transparent !important;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    position: relative;
    .left {
      flex: 1;
      font-size: 14px;
      color: #8592a6;
      .left_flex {
        position: absolute;
        top: 0;
        left: 0;
        margin-top: 5px;
        .imgPhoto {
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          img {
            width: 80px;
            height: 80px;
            margin-right: 5px;
            border-radius: 50%;
          }
          .username {
            font-size: 18px;
            color: #000;
          }
        }
      }
      .icon_flex {
        display: flex;
        align-items: center;
        .iconfont {
          margin-right: 5px;
          font-size: 18px;
        }
      }
    }
    .right {
      flex: 2.5;
      .rating,
      .comment,
      .photo,
      .date {
        margin-bottom: 10px;
      }
      .rating {
        font-size: 12px;
        color: #acb4bf;
        span {
          font-size: 28px;
          color: #287dfa;
        }
      }
      .photo {
        img {
          width: 120px;
          height: 120px;
        }
      }
      .date {
        text-align: right;
        font-size: 14px;
        color: #acb4bf;
      }
      .admin_reply {
        position: relative;
        padding: 16px 20px;
        border-radius: 8px;
        margin-top: 10px;
        background: #f7f7fa;
        .reply {
          position: relative;
          padding: 15px 15px;
          border-radius: 8px;
          background: #f7f7fa;
          overflow: hidden;
        }
      }
      .admin_reply:before {
        position: absolute;
        display: inline-block;
        width: 20px;
        height: 20px;
        top: -10px;
        left: 100px;
        background: #f7f7fa;
        transform: rotate(45deg);
        content: '';
      }
    }
  }
}
</style>
