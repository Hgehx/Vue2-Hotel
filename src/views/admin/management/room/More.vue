<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>编辑客房介绍</span>
      </div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item
          :label="item.label"
          v-for="(item, index) in baseList"
          :key="index"
        >
          <el-input v-model="item.model" style="width: 125px"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="食品饮品">
          <el-input v-model="formInline.foot"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="费用政策">
          <el-input v-model="formInline.policy"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="便利设施">
          <el-input
            type="textarea"
            style="width: 800px"
            class="custom-input"
            v-model="formInline.facilities"
          ></el-input>
        </el-form-item>
        <br />
        <el-form-item label="浴室配套">
          <el-input v-model="formInline.bathroom"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="洗浴用品">
          <el-input v-model="formInline.bathing"></el-input>
        </el-form-item>
        <br />
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button type="primary" @click="$router.back()">返回</el-button>
        </el-form-item>
      </el-form>
      <h4>预览效果</h4>
      <div v-html="formInline.baseinfo"></div>
      <div>
        <p>食品饮品: {{ formInline.foot }}</p>
        <p>费用政策: {{ formInline.policy }}</p>
        <p>便利设施: {{ formInline.facilities }}</p>
        <p>浴室配套: {{ formInline.bathroom }}</p>
        <p>洗浴用品: {{ formInline.bathing }}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'roomMore',
  data() {
    return {
      formInline: {
        room_id: this.$store.state.editRoom.aroom_mid,
        baseinfo: '', //基本信息汇总
        foot: '', //食品饮品
        policy: '', // 费用政策
        facilities: '', // 便利设施
        bathroom: '', // 浴室配套
        bathing: '' //洗浴用品
      },
      baseList: [
        //基本字段
        {
          label: '床铺',
          icon: 'icon-chuang',
          model: ''
        },
        {
          label: '空间',
          icon: 'icon-fangwumianji',
          model: ''
        },
        {
          label: '楼层',
          icon: 'icon-dituleilouti',
          model: ''
        },
        {
          label: '窗户',
          icon: 'icon-chuanghu',
          model: ''
        },
        {
          label: '无线网',
          icon: 'icon-wuxianwangluo',
          model: ''
        },
        {
          label: '吸烟',
          icon: 'icon-xiyan',
          model: ''
        },
        {
          label: '入住人数',
          icon: 'icon-renshutongji',
          model: ''
        },
        {
          label: '早餐',
          icon: 'icon-zaocan',
          model: ''
        }
      ],
      getBase: []
    }
  },
  mounted() {
    // 获取介绍内容
    this.getMore()
  },
  watch: {},
  methods: {
    //编辑客房信息内容获取
    async getMore() {
      const { data: res } = await this.$http.get('/admin/idMore', {
        params: {
          room_id: this.formInline.room_id
        }
      })
      if (res.status === 200) {
        this.formInline = res.data[0]
        // 如果没有数据的情况下，就相当于，客房信息刚创建好
        if (res.data[0].baseinfo) {
          // 对html进行分解出来数据
          const html = res.data[0].baseinfo
          const regex =
            /<div><span style="display: none">(.*?)<\/span><i class="([^"]+)"><\/i><span>(.*?)<\/span><\/div>/g
          let match
          while ((match = regex.exec(html))) {
            const label = match[1]
            const icon = match[2]
            const model = match[3]
            // 保存到数组当中
            this.getBase.push({
              label,
              icon,
              model
            })
          }
          this.baseList = this.getBase
        }
      }
    },
    // 表单提交
    onSubmit() {
      const html = this.baseList
        .map(item => {
          return `<div><span style="display: none">${item.label}</span><i class="iconfont ${item.icon}"></i><span>${item.model}</span></div>`
        })
        .join('')
      this.formInline.baseinfo = html

      this.$confirm('确定提交数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 修改
          const { data: res } = await this.$http.patch(
            '/admin/updateMore',
            this.formInline
          )
          if (res.status === 200) {
            console.log('成功')
          } else {
            console.log('失败---', res)
          }
          this.$message({
            type: 'success',
            message: '提交成功!'
          })
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
  }
  .handle {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }
  .el-input {
    width: 800px;
  }
  /deep/.custom-input .el-textarea__inner {
    height: 70px; /* 设置你想要的高度 */
  }
}
</style>
