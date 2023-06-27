<template>
  <div class="login-register-page">
    <el-card class="login-register-card">
      <h1>后台管理系统</h1>

      <!-- 登录表单 -->
      <el-form
        ref="loginFormRef"
        status-icon
        hide-required-asterisk
        :model="loginForm"
        :rules="loginFormRules"
        label-width="80px"
        v-show="!isRegisterFormVisible"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleLogin">登录</el-button>
          <el-button type="text" @click="toggleForm"
            >没有账号？立即注册</el-button
          >
        </el-form-item>
      </el-form>

      <!-- 注册表单 -->
      <el-form
        ref="registerFormRef"
        status-icon
        hide-required-asterisk
        :model="registerForm"
        :rules="registerFormRules"
        label-width="80px"
        v-show="isRegisterFormVisible"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="registerForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="registerForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            type="password"
            v-model="registerForm.confirmPassword"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item label="密钥" prop="secretKey">
          <el-input
            v-model="registerForm.secretKey"
            placeholder="请输入密钥"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleRegister">注册</el-button>
          <el-button type="text" @click="toggleForm"
            >已有账号？立即登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AdminLogin',
  data() {
    return {
      isRegisterFormVisible: false,
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        password: '',
        confirmPassword: '',
        secretKey: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      registerFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: this.validateConfirmPassword, trigger: 'blur' }
        ],
        secretKey: [
          { required: true, message: '请输入密钥', trigger: 'blur' },
          { min: 3, max: 3, message: '长度为3个字符', trigger: 'blur' },
          { validator: this.validateConfirmSecretKey, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginFormRef.validate(valid => {
        if (valid) {
          const { username, password } = this.loginForm
          console.log(username, password)
          // 处理登录逻辑
          this.$http
            .get('/admin/login', {
              params: {
                aname: username,
                password
              }
            })
            .then(res => {
              if (res.data.status == 200) {
                this.$message({
                  message: '登录成功',
                  type: 'success'
                })
                this.$router.push('/admin/')
              } else {
                this.$message.error('账号或密码错误')
              }
            })
        }
      })
    },
    handleRegister() {
      this.$refs.registerFormRef.validate(valid => {
        if (valid) {
          const { username, password, confirmPassword } = this.registerForm
          // 处理注册逻辑
          console.log('注册：', username, password, confirmPassword)
        }
      })
    },
    toggleForm() {
      this.isRegisterFormVisible = !this.isRegisterFormVisible
    },
    validateConfirmPassword(rule, value, callback) {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    },
    validateConfirmSecretKey(rule, value, callback) {
      if (value !== 'hge') {
        callback(new Error('密钥不正确，请联系老板'))
      } else {
        callback()
      }
    }
  }
}
</script>

<style lang="less" scoped>
h1 {
  margin-bottom: 20px;
}
.login-register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-register-card {
  width: 400px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
