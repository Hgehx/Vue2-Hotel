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

// 导出路由模块
export default router
