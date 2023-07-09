import Vue from 'vue'
import Vuex from 'vuex'
import editAvatar from './editAvatar'
import editRoom from './editRoom'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    adminName: '管理员名',
    userName: '尊敬的用户',
    userPhone: ''
  },
  modules: {
    editAvatar,
    editRoom
  }
})
