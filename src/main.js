// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
//导入全局样式表
import '@/assets/css/global.css'
//引入Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入Ajax
import axios from 'axios'
import VueAxios from 'vue-axios'
//导入路由表
import router from '@/router'
import less from 'less'

Vue.use(less);
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false
//配置请求的根路径
// axios.defaults.baseURL = 'https://www.fastmock.site/mock/26435024ab33e0f4374c1f13944a8064/in/login'
// Vue.prototype.$http.post = axios

axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
