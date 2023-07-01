import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'default-passive-events'
import './assets/css/iconfont.css'
import axios from 'axios'
import store from './store'

// 全局配置 axios 的请求根路径
axios.defaults.baseURL = 'http://127.0.0.1'
Vue.prototype.$http = axios

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  axios,
  store,
  render: h => h(App)
}).$mount('#app')
