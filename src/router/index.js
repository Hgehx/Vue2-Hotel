import Vue from 'vue'
import VueRouter from 'vue-router'
import UserLogin from '@/views/user/Login.vue'

import Admin from '@/views/admin/Index.vue'
import AdminLogin from '@/views/admin/login/Login.vue'
import AdminHome from '@/views/admin/management/Home.vue'
import AdminRoom from '@/views/admin/management/room/Room.vue'
import AdminRoomEdit from '@/views/admin/management/room/Edit.vue'
import AdminRoomMore from '@/views/admin/management/room/More.vue'
import AdminReservation from '@/views/admin/management/Reservation.vue'
import AdminReview from '@/views/admin/management/Review.vue'
import AdminBasicInfo from '@/views/admin/management/myAcc/BasicInfo.vue'
import AdminEditAvatar from '@/views/admin/management/myAcc/EditAvatar.vue'
import AdminEditPassword from '@/views/admin/management/myAcc/EditPassword.vue'
Vue.use(VueRouter)

// 定义路由
const routes = [
  {
    path: '/',
    name: 'login',
    component: UserLogin
  },
  {
    path: '/admin',
    component: Admin,
    meta: {
      title: '后台'
    },
    children: [
      {
        path: '', // 后台首页
        component: AdminHome,
        meta: {
          title: '首页'
        }
      },
      {
        path: 'room', // 客房管理
        component: AdminRoom,
        meta: {
          title: '客房管理'
        }
      },
      {
        path: 'roomedit', // 客房编辑
        component: AdminRoomEdit,
        meta: {
          title: '客房编辑'
        }
      },
      {
        path: 'rmore', // 更多客房内容
        component: AdminRoomMore,
        meta: {
          title: '更多客房内容'
        }
      },
      {
        path: 'resv', // 预定信息管理
        component: AdminReservation,
        meta: {
          title: '预定信息管理'
        }
      },
      {
        path: 'revi', // 用户评价管理
        component: AdminReview,
        meta: {
          title: '用户评价管理'
        }
      },
      {
        path: 'binfo', // 管理员基本信息
        component: AdminBasicInfo,
        meta: {
          title: '管理员基本信息'
        }
      },
      {
        path: 'eavatar', // 修改头像
        component: AdminEditAvatar,
        meta: {
          title: '修改头像'
        }
      },
      {
        path: 'epassword', // 修改密码
        component: AdminEditPassword,
        meta: {
          title: '修改密码'
        }
      }
    ]
  },
  {
    path: '/admin/login',
    name: 'adminLogin',
    component: AdminLogin
  }
]

const router = new VueRouter({
  routes
})

// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  const adminToken = localStorage.getItem('adminToken')
  if (!adminToken) {
    // 再没有token的前提下不能进入后台主页面
    if (to.name !== 'adminLogin') {
      next({ name: 'adminLogin' })
    } else {
      next()
    }
  } else {
    // 如果token存在了，是不能退回到后台登录页，只能在主页面点击退出删除token之后才能回到登录页
    if (to.name === 'adminLogin') {
      next(false)
    } else {
      next()
    }
  }
})

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 导出路由模块
export default router
