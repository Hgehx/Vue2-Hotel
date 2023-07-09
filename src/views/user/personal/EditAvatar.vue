<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改用户头像</span>
      </div>
      <!-- 将file隐藏，通过按钮点击事件来触发 -->
      <input
        type="file"
        ref="fileInput"
        class="fileInput"
        id="photofile"
        @change="changePhoto"
        required
      />
      <!-- 图片转为base64之后显示在页面中 -->
      <div class="img">
        <div class="left">
          <span @click="localPhoto">
            <i class="iconfont icon-tupiantianjia"></i>
            选择本地图片</span
          >
          <span @click="netPhoto">
            <i class="iconfont icon-wangluo"></i>
            选择推荐头像</span
          >
        </div>

        <div class="right">
          <img
            :src="photo ? photo : $store.state.editAvatar.userAvatar"
            alt=""
            class="imgStyle"
          />
          <span>当前头像</span>
        </div>
      </div>
      <!-- 上传到数据库 -->
      <div class="submit">
        <div style="font-size: 14px; color: #99a2aa">
          请选择图片上传：大小180 * 180像素支持JPG、PNG等格式，图片需小于2M
        </div>
        <el-button @click="subPhoto" class="updatebtn">更新</el-button>
      </div>
    </el-card>

    <!-- 点击推荐头像弹出框 -->
    <el-dialog
      title="选择推荐头像"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      class="dialog"
    >
      <ul>
        <li v-for="item in photoList" :key="item.id">
          <img :src="item.photo" alt="" @click="clickPhoto(item.id)" />
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EditAvatar',
  data() {
    return {
      centerDialogVisible: false,
      photo: '',
      photoList: [
        {
          id: 1,
          photo: 'https://s1.ax1x.com/2023/07/01/pCBBWNR.png'
        },
        {
          id: 2,
          photo: 'https://s1.ax1x.com/2023/07/01/pCBBrcT.png'
        },
        {
          id: 3,
          photo: 'https://s1.ax1x.com/2023/07/01/pCBBD3V.png'
        },
        {
          id: 4,
          photo: 'https://s1.ax1x.com/2023/07/01/pCBBdNn.png'
        },
        {
          id: 5,
          photo: 'https://s1.ax1x.com/2023/07/01/pCBB536.png'
        },
        {
          id: 6,
          photo: 'https://s1.ax1x.com/2023/07/01/pCBBwhq.png'
        }
      ]
    }
  },
  methods: {
    // 本地图片
    localPhoto() {
      this.$refs.fileInput.click()
    },
    // 推荐图片
    netPhoto() {
      // 弹出框显示
      this.centerDialogVisible = true
    },
    // 点击推荐图片
    clickPhoto(id) {
      this.centerDialogVisible = false
      const listphoto = this.photoList.find(item => item.id === id)?.photo //去寻找对应id的对象，将对象中的图片提出来，完成网络图片的选择
      if (listphoto) {
        this.photo = listphoto
      } else {
        this.$message.error('更新失败')
      }
    },

    // base64提交给数据库
    subPhoto() {
      this.$confirm('确定更新头像吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 提交给状态管理vuex
          this.$store.commit('editAvatar/userAvatar', this.photo)
          // 获取当前管理员id 然后请求数据库，将头像数据更新
          this.$http
            .patch('/user/updateAvatar', {
              phone: this.$store.state.userPhone,
              avatar: this.photo
            })
            .then(res => {
              if (res.status == 200) {
                this.$message({
                  message: '更新头像成功',
                  type: 'success'
                })
              } else {
                console.log('err')
              }
            })
        })
        .catch(() => {})
    },

    // 将图片转为base64编码格式
    changePhoto(e) {
      // 判断是否选择文件
      if (e.target.files.length === 0) {
        return
      }

      // 判断选择文件的类型
      const file = e.target.files[0]
      if (!file.type.startsWith('image/')) {
        this.$message.error('请选择图片文件')
        return
      }

      // 将图片文件转成base64
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = e => {
        this.photo = e.target.result
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
  .handle {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }
  .img {
    margin: 20px 0;
    display: flex;
    justify-content: center;
    .left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-right: 1px solid #e5e9ef;
      padding-right: 50px;
      span {
        cursor: pointer;
        background: #f1f2f5;
        width: 178px;
        height: 84px;
        top: 0;
        left: 0;
        border: 1px solid #e5e9ef;
        border-radius: 4px;
        transition: all 0.6s ease;
        display: flex;
        align-items: center;
        padding-left: 10px;
        margin-bottom: 10px;
        i {
          font-size: 25px;
          margin-right: 3px;
        }
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-left: 50px;
      /* 设置容器高度，这里使用视口高度 */
    }

    .imgStyle {
      width: 150px;
      height: 150px;
      overflow: hidden;
      border-radius: 50%;
      border: 1px solid #e6eaf0;
      background-size: cover;
    }

    .right span {
      margin-top: 10px;
      color: #99a2aa;
    }
  }
  .submit {
    width: 490px;
    margin: 0 auto;
    text-align: center;
    .updatebtn {
      width: 100px;
      margin-top: 20px;
    }
  }
  .fileInput {
    display: none;
  }
  .dialog {
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: center; /* 水平居中 */
      align-items: center; /* 垂直居中 */
      li {
        margin-right: 10px;
        margin-bottom: 5px;
        &:nth-child(3n) {
          margin-right: 0;
        }
        img {
          width: 150px;
          height: 150px;
          overflow: hidden;
          border-radius: 50%;
          border: 1px solid #e6eaf0;
          background-size: cover;
        }
      }
    }
  }
}
</style>
