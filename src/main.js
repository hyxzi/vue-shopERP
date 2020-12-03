import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store/index'
import './plugins/element.js'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
//导入全局样式
import './assets/css/global.css'
//导入字体图标
import './assets/font/iconfont.css'
import TreeTable from 'vue-table-with-tree-grid'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
/*axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config=>{
  config.headers.Authorization = sessionStorage.getItem('token')
  console.log(config)
  return config
})*/
Vue.component('tree-table', TreeTable)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
