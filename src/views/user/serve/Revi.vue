<template>
  <div class="container">
    <h3>用户点评</h3>
    <div class="content">
      <div class="left">
        <div class="left_flex">
          <div class="imgPhoto">
            <img src="https://s1.ax1x.com/2023/07/01/pCBBWNR.png" alt="" />
            <span class="username">尊敬的用户</span>
          </div>
          <div class="icon_flex">
            <i class="iconfont icon-chuang"></i>大床房
          </div>
          <div class="icon_flex">
            <i class="iconfont icon-riqi"></i>于2023年7月2日入住
          </div>
        </div>
      </div>
      <div class="right">
        <div class="rating"><span>5</span>/ 5</div>
        <div class="comment">
          这个价格能在南京订到这个级别的酒店真的太划算了！酒店配免费停车场，前台服务也特别好，后半夜到达自动给你续住到隔日下午两点退房。周边有个7+7家常菜也很好吃，去无想山自驾的朋友可以试试看哦！
        </div>
        <div class="photo"><img src="@/assets/img/b1.png" alt="" /></div>
        <div class="date">2023年7月6日 发表</div>
        <div class="admin_reply">
          <h4>酒店回复</h4>
          <div class="reply">
            {{ replyContent }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userRevi',
  data() {
    return {
      replyContent:
        '小主的满意点赞，是对我们最大的认可哦。心愿是风，快乐是帆，幸福是船，心愿的风吹着快乐的帆载着幸福的船，飘向你，送你世上所有的幸福，愿小主的每次回家都是完美的，记得常回家看看哦，我们会继续努力带给您更加完美的住宿感受。'
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
