<template>
  <div class="login">
    <div class="box">
      <!-- 滑动盒子 -->
      <div class="pre-box" @click="changeX" ref="pre_box">
        <h1>WELCOME</h1>
        <p>XIANG LU</p>
        <div class="img-box">
          <img src="@/assets/logo_tx.png" alt="" ref="img_change" />
        </div>
      </div>

      <!-- 注册模块 -->
      <div class="register-form">
        <div class="title-box">
          <h1>注册</h1>
        </div>
        <el-form
          ref="registerForm"
          :rules="rules"
          :model="registerForm"
          label-with="5px"
        >
          <el-form-item label="" prop="username">
            <el-input
              v-model="registerForm.phone"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              v-model="registerForm.password"
              placeholder="请输入密码"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="" prop="repassword">
            <el-input
              v-model="registerForm.repassword"
              placeholder="请再次输入密码"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="small"
              @click="register('registerForm')"
              >注册</el-button
            >
            <span class="toLo" @click="toLo('registerForm')"
              >已有账号?前往登录</span
            >
          </el-form-item>
        </el-form>
      </div>

      <!-- 登录模块 -->
      <div class="login-form">
        <div class="title-box">
          <h1>登录</h1>
        </div>
        <el-form
          ref="loginForm"
          :model="loginForm"
          label-with="5px"
          :rules="rules"
        >
          <el-form-item label="" prop="username">
            <el-input
              v-model="loginForm.phone"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="submit('loginForm')"
              >登录</el-button
            >
            <span class="toRe" @click="toRe('loginForm')"
              >没有账号?请先注册</span
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data() {
    return {
      loginForm: {
        phone: '',
        password: ''
      },
      registerForm: {
        phone: '',
        password: '',
        repassword: ''
      },
      flag: 0,
      rules: {
        phone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' }
          // { min: 11, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
          // { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
          // { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    // 最上层盒子移动
    changeX() {
      let pre_box = this.$refs.pre_box
      if (this.flag === 0) {
        pre_box.style.transform = 'translateX(100%)'
        pre_box.style.background = 'rgb(247, 209, 215)'
        this.flag = 1
      } else {
        pre_box.style.transform = 'translateX(0%)'
        pre_box.style.background = 'rgb(191, 227, 241)'
        this.flag = 0
      }
    },
    // 前往注册
    toRe(formName) {
      // console.log('123')
      this.changeX()
      this.$refs[formName].resetFields()
    },
    // 前往登录
    toLo(formName) {
      this.changeX()
      this.$refs[formName].resetFields()
    },
    // 注册事件
    register(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.registerForm.password !== this.registerForm.repassword) {
            this.$message.error('两次密码不相同，请重新输入')
          } else {
            this.$http
              .post('/user/register', {
                phone: this.registerForm.phone,
                password: this.registerForm.password
              })
              .then(res => {
                if (res.data.status == 200) {
                  this.$message({
                    message: '注册成功，请前往登录',
                    type: 'success'
                  })
                } else {
                  // 可以判断手机号是否有相同的
                  this.$message.error(res.data.message)
                }
              })
          }
        }
      })
    },
    // 登录事件
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .get('/user/login', {
              params: {
                phone: this.loginForm.phone,
                password: this.loginForm.password
              }
            })
            .then(res => {
              // 登录时判断数据库中用户头像是否存在，不存在设置默认头像
              this.$store.dispatch('editAvatar/isToken')
              if (res.data.status == 200) {
                this.$message({
                  message: '登录成功',
                  type: 'success'
                })
                this.$router.push('/')
                // console.log(res.data.token)
                localStorage.setItem('userToken', res.data.token)
              } else {
                this.$message.error('账号或密码错误')
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.login {
  /* 溢出隐藏 */
  height: 100vh;
  overflow-x: hidden;
  display: flex;
  /* 渐变方向从左到右 */
  background: linear-gradient(to right, rgb(247, 209, 215), rgb(191, 227, 241));
  .box {
    width: 1050px;
    height: 600px;
    display: flex;
    /* 相对定位 */
    position: relative;
    z-index: 2;
    margin: auto;
    /* 设置圆角 */
    border-radius: 8px;
    /* 设置边框 */
    border: 1px solid rgba(255, 255, 255, 0.6);
    /* 设置盒子阴影 */
    box-shadow: 2px 1px 19px rgba(0, 0, 0, 0.1);

    .pre-box {
      /* 宽度为大盒子的一半 */
      width: 50%;
      height: 100%;
      /* 绝对定位 */
      position: absolute;
      /* 距离大盒子左侧为0 */
      left: 0;
      /* 距离大盒子顶部为0 */
      top: 0;
      z-index: 99;
      border-radius: 4px;
      background: rgb(191, 227, 241);
      box-shadow: 2px 1px 19px rgba(0, 0, 0, 0.1);
      /* 动画过渡，先加速再减速 */
      transition: 0.5s ease-in-out;
      /* 滑动盒子的标题 */
      h1 {
        margin-top: 150px;
        text-align: center;
        /* 文字间距 */
        letter-spacing: 5px;
        color: white;
        /* 禁止选中 */
        user-select: none;
        /* 文字阴影 */
        text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
      }

      /* 滑动盒子的文字 */
      p {
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin: 20px 0;
        /* 禁止选中 */
        user-select: none;
        font-weight: bold;
        color: white;
        text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
      }

      /* 图片盒子 */
      .img-box {
        width: 200px;
        height: 200px;
        margin: 20px auto;
        /* 设置为圆形 */
        border-radius: 50%;
        /* 设置用户禁止选中 */
        user-select: none;
        overflow: hidden;
        box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
        img {
          width: 100%;
          transition: 0.5s;
        }
      }
    }

    /* 登录和注册盒子 */
    .login-form,
    .register-form {
      flex: 1;
      height: 100%;
      color: #fff;
      text-align: center;
      .title-box {
        // height: 300px;
        // line-height: 500px;
        h1 {
          text-align: center;
          color: white;
          /* 禁止选中 */
          user-select: none;
          letter-spacing: 5px;
          text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
        }
      }

      /* 输入框盒子 */
      .el-form {
        display: flex;
        /* 纵向布局 */
        flex-direction: column;
        /* 水平居中 */
        align-items: center;
        width: 100%;
        .el-form-item {
          width: 70%;
          .el-button {
            margin-top: 10px;
            margin-left: 30px;
            width: 90px;
          }
          span {
            margin-left: 10px;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
    .register-form {
      .title-box {
        h1 {
          height: 270px;
          line-height: 480px;
        }
      }
    }
    .login-form {
      .title-box {
        h1 {
          height: 300px;
          line-height: 500px;
        }
      }
    }
  }
}
</style>
