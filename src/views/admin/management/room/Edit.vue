<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ title }}客房信息</span>
      </div>
      <div style="width: 440px">
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          :rules="rules"
          :hide-required-asterisk="true"
        >
          <el-form-item label="客房名称" prop="room_name">
            <el-input v-model="form.room_name"></el-input>
          </el-form-item>
          <el-form-item label="介绍" prop="room_info">
            <el-input v-model="form.room_info"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input v-model.number="form.price"></el-input>
          </el-form-item>
          <el-form-item label="客房余量" prop="room_num">
            <el-input v-model.number="form.room_num"></el-input>
          </el-form-item>
          <el-form-item label="图片" prop="photo">
            <img
              class="photo"
              @click="localPhoto"
              :src="form.photo || 'https://s1.ax1x.com/2023/07/01/pCBxtr6.png'"
              style="cursor: pointer"
              alt=""
            />
            <!-- 将file隐藏，通过按钮点击事件来触发 -->
            <input
              type="file"
              ref="fileInput"
              id="photofile"
              @change="changePhoto"
              required
              style="display: none"
            />
            <div style="color: #99aac7; margin-top: -15px">
              注：点击图片即可上传
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
            <el-button @click="$router.back()">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'roomEdit',
  data() {
    // 图片自定义验证规则
    var validatePhoto = (rule, value, callback) => {
      if (value == 'https://s1.ax1x.com/2023/07/01/pCBxtr6.png') {
        callback(new Error('请选择图片'))
      } else {
        callback()
      }
    }
    // 数据验证
    var validateNumber = (rule, value, callback) => {
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      }, 200)
    }
    return {
      title: this.$store.state.editRoom.aroom_edit, //操作类型名称
      tableData: [], //表格数据
      form: {
        room_id: this.$store.state.editRoom.aroom_total + 1, //+1 => 通过room_id让两个表连接，当room表创建对应的more表也创建数据，并且room_id相同
        room_name: '',
        room_info: '',
        price: '',
        room_num: '',
        photo: 'https://s1.ax1x.com/2023/07/01/pCBxtr6.png'
      }, //表单
      rules: {
        room_name: [
          { required: true, message: '请输入客房名称', trigger: 'blur' }
        ],
        room_info: [
          { required: true, message: '请输入客房介绍', trigger: 'blur' }
        ],
        room_num: [
          { required: true, message: '请输入客房余量', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ],
        photo: [
          { required: true, message: '请选择图片', trigger: 'blur' },
          { validator: validatePhoto, trigger: 'blur' }
        ]
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
    // 获取对应客房信息
    async getRoom() {
      if (this.title === '编辑') {
        const { data: res } = await this.$http.get('/admin/roomId', {
          params: {
            id: this.$store.state.editRoom.aroom_id
          }
        })
        if (res.status === 200) {
          // console.log(res.data)
          this.form = res.data[0]
        }
      }
    },
    // 表单提交
    async onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm('确定提交客房信息吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(async () => {
              let res = {}
              // 判断是编辑事件还是添加事件
              if (this.title === '编辑') {
                res = await this.$http.patch('/admin/updateRoom', this.form)
              } else {
                res = await this.$http.post('/admin/addRoom', this.form)
              }
              console.log(res.data)
              if (res.data.status === 200) {
                this.$message({
                  type: 'success',
                  message: '提交成功!'
                })
                this.$router.push('/admin/room')
              }
            })
            .catch(() => {})
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 点击图片触发文件上传
    localPhoto() {
      this.$refs.fileInput.click()
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
        this.form.photo = e.target.result
      }
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
  }
  .handle {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }
  .photo {
    width: 350px;
    height: 200px;
  }
}
</style>
