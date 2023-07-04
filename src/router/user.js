import UserLogin from '@/views/user/Login.vue'
import UserIndex from '@/views/user/Index.vue'

const userManagementRoutes = [
  {
    path: '/login',
    name: 'login',
    component: UserLogin
  },
  {
    path: '/',
    name: 'user',
    component: UserIndex
  }
]

export default userManagementRoutes
