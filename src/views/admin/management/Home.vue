<template>
  <div class="container">
    <!-- 内容 -->
    <div class="fourBox">
      <ul>
        <li>
          <div class="num" style="color: #769fcd">35</div>
          <div class="explain">日新增入住(间)</div>
        </li>
        <li>
          <div class="num" style="color: #62d2a2">12</div>
          <div class="explain">日新增退房数(间)</div>
        </li>
        <li>
          <div class="num" style="color: #ffb400">12138</div>
          <div class="explain">总收入(元)</div>
        </li>
        <li>
          <div class="num" style="color: #f38181">724</div>
          <div class="explain">总评论数(个)</div>
        </li>
      </ul>
    </div>
    <div class="chart">
      <el-card class="columnar">
        <div id="echart" style="flex: 1; height: 350px"></div>
      </el-card>
      <el-card class="pie">
        <div id="pie" style="flex: 1; height: 350px"></div>
      </el-card>
    </div>
    <div class="footer">
      <ul>
        <li>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>今日订单</span>
            </div>
            <div class="content">
              <ul>
                <li>
                  今日订单数 <br />
                  <span>18</span>
                </li>
                <li>
                  实际订单数<br />
                  <span>12</span>
                </li>
                <li>
                  累计金额<br />
                  <span>99</span>
                </li>
              </ul>
            </div>
          </el-card>
        </li>

        <li>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>本月订单</span>
            </div>
            <div class="content">
              <ul>
                <li>
                  本月订单数 <br />
                  <span>258</span>
                </li>
                <li>
                  实际订单数<br />
                  <span>176</span>
                </li>
                <li>
                  累计金额<br />
                  <span>1021</span>
                </li>
              </ul>
            </div>
          </el-card>
        </li>

        <li>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>帮助</span>
            </div>
            <div class="content">
              <ul>
                <li>
                  <el-button type="primary">使用文档</el-button>
                </li>
                <li>
                  <el-button type="primary">联系保洁</el-button>
                </li>
                <li>
                  <el-button type="primary">认真摸鱼</el-button>
                </li>
              </ul>
            </div>
          </el-card>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'AdminHome',
  async mounted() {
    // 左侧柱状图
    var myChart1 = echarts.init(document.getElementById('echart'))
    // 指定图表的配置项和数据
    var option1 = {
      title: {
        text: '日新增入住数'
      },
      textStyle: {
        fontSize: 30
      },
      tooltip: {},
      legend: {},
      xAxis: {
        data: ['6月12日', '6月13日', '6月14日', '6月15日', '6月16日', '6月17日']
      },
      yAxis: {},
      series: [
        {
          name: '入住数量',
          type: 'bar',
          data: [5, 20, 36, 10, 14, 20]
        }
      ]
    }
    // 柱状图使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1)
    // 右侧饼图
    var chartDom = document.getElementById('pie')
    var myChart = echarts.init(chartDom)
    var option
    option = {
      title: {
        text: '客房余量'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '8%',
        left: 'center'
      },
      series: [
        {
          name: '余量',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 20, name: '双人床' },
            { value: 14, name: '大床房' },
            { value: 8, name: '海景房' },
            { value: 12, name: '影视房' },
            { value: 4, name: '高级大床房' }
          ]
        }
      ]
    }
    option && myChart.setOption(option)
  }
}
</script>

<style lang="less" scoped>
.container {
  .fourBox {
    ul {
      display: flex;
      justify-content: space-around;
      letter-spacing: 3px;
    }
    li {
      // width: 300px;
      flex: 1;
      height: 130px;
      background-color: pink;
      margin-right: 20px;
      border-radius: 12px;
      &:nth-child(4) {
        margin-right: 0;
      }
      .num {
        height: 100px;
        line-height: 100px;
        font-size: 55px;
        text-align: center;
        background-color: #fff;
      }
      .explain {
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #e5e5e5;
      }
    }
  }
  .chart {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .columnar {
      flex: 2;
    }
    #echart {
      background-color: #fff;
      margin-bottom: -40px;
    }
    .pie {
      flex: 1;
      margin-left: 20px;
    }
  }
  .footer {
    margin-top: 20px;
    ul {
      display: flex;
      justify-content: space-between;
      li {
        flex: 1;
        margin-right: 30px;
        &:nth-child(3) {
          margin-right: 0;
        }
        .el-card {
          height: 200px;
        }
        .clearfix {
          font-size: 25px;
        }
        .content {
          font-size: 16px;
          text-align: center;
          margin-top: 10px;
          span {
            font-size: 35px;
          }
          li {
            border-right: 1px solid #f2f3f5;
            &:nth-child(3) {
              border-right: none;
            }
          }
        }
      }
    }
  }
}
</style>
