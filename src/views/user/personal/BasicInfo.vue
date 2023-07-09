<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户基本信息</span>
      </div>
      <div class="content">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          style="width: 300px"
          :hide-required-asterisk="true"
        >
          <el-form-item label="用户头像" prop="avatar">
            <div class="adminAvatar">
              <div
                class="avatarHover"
                style="cursor: pointer"
                @click="$router.push('/admin/eavatar')"
              >
                更换图片
              </div>
              <img class="avatarImage" :src="ruleForm.avatar" alt="" />
            </div>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="ruleForm.phone" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="isShow = true"
              >修改资料</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!-- 修改资料对话框 -->
    <el-dialog title="修改资料" :visible.sync="isShow" width="30%" center>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        style="width: 300px"
        :hide-required-asterisk="true"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="onSubmit">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'BaseInfo',
  data() {
    return {
      isShow: false,
      ruleForm: {
        id: 1,
        username: '',
        phone: '',
        email: '',
        avatar: '',
        flag: 0
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        phone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
      }
    }
  },
  // 监听器
  watch: {
    'ruleForm.phone': function (newVal, oldVal) {
      // console.log(newVal, oldVal)
      if (newVal === oldVal) {
        console.log(newVal, oldVal)
      }
    }
  },
  mounted() {
    // 获取个人信息
    this.getInfo()
  },
  methods: {
    // 获取个人信息
    async getInfo() {
      const { data: res } = await this.$http.get('/user/getInfo', {
        headers: {
          Authorization: localStorage.getItem('userToken')
        }
      })
      if (res.status === 200) {
        this.ruleForm = res.data
      }
    },
    // 提交修改
    async onSubmit() {
      const { data: res } = await this.$http.patch(
        '/user/updateInfo',
        this.ruleForm
      )
      if (res.status == 200) {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.isShow = false
      } else if (res.status == 202) {
        this.$message({
          message: res.message,
          type: 'error'
        })
      }
    },
    // 取消修改
    cancel() {
      this.isShow = false
      this.getInfo()
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  .clearfix {
    font-size: 25px;
  }
  .content {
    .adminAvatar {
      position: relative;
      width: 100px;
      height: 100px;
      overflow: hidden;
      border-radius: 50%;
      border: 1px solid #e6eaf0;

      .avatarImage {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .avatarHover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        opacity: 0;
        transition: opacity 0.3s;
      }

      &:hover .avatarHover {
        opacity: 1;
      }
    }
  }
}
</style>
