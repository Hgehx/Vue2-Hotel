import Vue from 'vue'
import Vuex from 'vuex'
import editAvatar from './editAvatar'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    adminName: '管理员名'
  },
  modules: {
    editAvatar
  }
})
