import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import UserLogin from '@/views/user/Login.vue'

import Admin from '@/views/admin/Index.vue'
import AdminLogin from '@/views/admin/login/Login.vue'
import AdminHome from '@/views/admin/management/Home.vue'

Vue.use(VueRouter)

// 定义路由
const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/',
    name: 'login',
    component: UserLogin
  },
  {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: 'login',
        name: 'adminLogin',
        component: AdminLogin
      },
      {
        path: '',
        component: AdminHome
      }
    ]
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

// 导出路由模块
export default router