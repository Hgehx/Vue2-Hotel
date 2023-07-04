// 管理员路由模块
// 管理员登录
import Admin from '@/views/admin/Index.vue'
import AdminLogin from '@/views/admin/login/Login.vue'
import AdminHome from '@/views/admin/management/Home.vue'
// 客房管理
import AdminRoomIndex from '@/views/admin/management/room/Index.vue'
import AdminRoom from '@/views/admin/management/room/Room.vue'
import AdminRoomEdit from '@/views/admin/management/room/Edit.vue'
import AdminRoomMore from '@/views/admin/management/room/More.vue'
// 预约管理
import AdminReservation from '@/views/admin/management/Reservation.vue'
// 用户评价管理
import AdminReview from '@/views/admin/management/Review.vue'
// 管理员个人中心
import AdminBasicInfo from '@/views/admin/management/myAcc/BasicInfo.vue'
import AdminEditAvatar from '@/views/admin/management/myAcc/EditAvatar.vue'
import AdminEditPassword from '@/views/admin/management/myAcc/EditPassword.vue'

const adminManagementRoutes = [
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
        name: 'home',
        meta: {
          title: '首页'
        }
      },
      {
        path: 'room', // 客房信息
        component: AdminRoomIndex,
        meta: {
          title: '客房信息'
        },
        children: [
          {
            path: '', // 客房管理
            component: AdminRoom,
            name: 'room',
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
          }
        ]
      },

      {
        path: 'resv', // 预定信息管理
        component: AdminReservation,
        name: 'resv',
        meta: {
          title: '预定信息管理'
        }
      },
      {
        path: 'revi', // 用户评价管理
        component: AdminReview,
        name: 'revi',
        meta: {
          title: '用户评价管理'
        }
      },
      {
        path: 'binfo', // 管理员基本信息
        component: AdminBasicInfo,
        name: 'binfo',
        meta: {
          title: '管理员基本信息'
        }
      },
      {
        path: 'epassword', // 修改密码
        component: AdminEditPassword,
        name: 'epassword',
        meta: {
          title: '修改密码'
        }
      },
      {
        path: 'eavatar', // 修改头像
        component: AdminEditAvatar,
        name: 'eavatar',
        meta: {
          title: '修改头像'
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

export default adminManagementRoutes
