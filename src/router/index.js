import Vue from 'vue'
import VueRouter from 'vue-router'

import userManagementRoutes from './user'
import adminManagementRoutes from './admin'

Vue.use(VueRouter)

// 定义路由
const routes = [
  // 用户路由
  ...userManagementRoutes,
  // 管理员路由
  ...adminManagementRoutes
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

// 多次点击路由报错处理
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 导出路由模块
export default router
