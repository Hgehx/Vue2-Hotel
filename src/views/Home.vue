<template>
  <div class="">
    <el-button type="primary" @click="updatePwd">更新密码</el-button>
    <el-button type="primary" @click="deluser">删除用户信息</el-button>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    //更新密码
    updatePwd() {
      this.$http
        .patch('/user/updatePwd', { id: 1, password: '456' })
        .then(res => {
          if (res.data.status == 200) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          } else {
            this.$message.error('修改失败')
          }
        })
    },
    // 删除用户
    deluser() {
      this.$http.delete('/user/deluser', { id: 13 }).then(res => {
        if (res.data.status == 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          this.$message.error('删除失败')
        }
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
