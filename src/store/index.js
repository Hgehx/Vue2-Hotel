import Vue from 'vue'
import Vuex from 'vuex'
import editAvatar from './editAvatar'
import editRoom from './editRoom'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    adminName: '管理员名'
  },
  modules: {
    editAvatar,
    editRoom
  }
})
