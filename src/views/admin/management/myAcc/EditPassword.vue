<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改密码</span>
      </div>
      <div class="content">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          style="width: 300px"
          :hide-required-asterisk="true"
        >
          <el-form-item label="旧密码" prop="oldPass">
            <el-input
              type="password"
              v-model="ruleForm.oldPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPass">
            <el-input
              type="password"
              v-model="ruleForm.newPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="button" @click="submitForm('ruleForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'EditPassword',
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (value === this.ruleForm.oldPass) {
        callback(new Error('新密码和旧密码不能相同'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.ruleForm.newPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        oldPass: '',
        newPass: '',
        checkPass: ''
      },
      rules: {
        oldPass: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        newPass: [{ validator: validatePass1, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  // 监听器
  watch: {},
  mounted() {
    // 获取个人信息
    this.getInfo()
  },
  methods: {
    // 获取个人信息
    async getInfo() {
      const { data: res } = await this.$http.get('/admin/getInfo', {
        headers: {
          Authorization: localStorage.getItem('adminToken')
        }
      })
      if (res.status === 200) {
        this.ruleForm = res.data
      }
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.$confirm('确定修改密码吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(async () => {
              const { oldPass, newPass } = this.ruleForm
              const { data: res } = await this.$http.patch(
                '/admin/updatePwd',
                {
                  oldPass,
                  newPass
                },
                {
                  headers: {
                    Authorization: localStorage.getItem('adminToken')
                  }
                }
              )
              if (res.status === 200) {
                this.$message({
                  message: '修改密码成功,请重新登录',
                  type: 'success'
                })
                localStorage.removeItem('adminToken')
                this.$router.push('/admin/login')
              } else {
                this.$message({
                  message: '旧密码不正确，请重新输入',
                  type: 'error'
                })
              }
            })
            .catch(() => {})
        }
      })
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
    .adminAavatar {
      width: 100px;
      height: 100px;
      overflow: hidden;
      border-radius: 50%;
      border: 1px solid #e6eaf0;
      background-size: cover;
    }
  }
}
</style>
