import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import router from './router/router'
import TiramisuStore from './store/store'
//  引入iconfont
import './assets/font_icon/iconfont.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(TiramisuStore)

Vue.http.options.xhr = {withCredentials: true}
Vue.http.interceptor.before = function (request, next) {
  // override before interceptor
  console.log(request)
  next()
}

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

