import UserLogin from '@/views/user/Login.vue'
import UserIndex from '@/views/user/Index.vue'
import UserResv from '@/views/user/serve/Resv.vue'
import Personal from '@/views/user/personal/Index.vue'
import userInfo from '@/views/user/personal/BasicInfo.vue'
import userAvatar from '@/views/user/personal/EditAvatar.vue'
import userPassword from '@/views/user/personal/EditPassword.vue'
import userOrder from '@/views/user/personal/Order.vue'
import userReview from '@/views/user/personal/Review.vue'
const userManagementRoutes = [
  {
    path: '/login', //前台登录
    name: 'login',
    component: UserLogin
  },
  {
    path: '/', // 前台首页
    name: 'user',
    component: UserIndex
  },
  {
    path: '/resv', //预定
    name: 'UserResv',
    component: UserResv
  },
  {
    path: '/personal', //个人中心
    component: Personal,
    children: [
      {
        path: '', //基本信息
        name: 'userInfo',
        component: userInfo
      },
      {
        path: 'order', //用户订单
        name: 'userOrder',
        component: userOrder
      },
      {
        path: 'review', //点评
        name: 'userReview',
        component: userReview
      },
      {
        path: 'eavatar', //修改头像
        name: 'userAvatar',
        component: userAvatar
      },
      {
        path: 'epwd', //修改密码
        name: 'userPassword',
        component: userPassword
      }
    ]
  }
]

export default userManagementRoutes
