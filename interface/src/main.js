import * as _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import TiramisuStorage from './plugins/storage'
import 'element-ui/lib/theme-default/index.css'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)
//  引入iconfont
import './assets/font_icon/iconfont.css'

//  vue-router  跨域
Vue.http.options.xhr = {withCredentials: true}
//  vue-resource  发送调试
Vue.http.interceptor.before = (request, next) => {
  //  发送拦截,自动添加用户票据
  // console.log(request)
  // if (request.method === 'POST') {
    request.params.user_ticket = TiramisuStorage.get('user_ticket')
  // }
  next()
}

import App from './App.vue'
import store from './store/store'
import router from './router/router'

var vm = new Vue({
  el: '#app',
  router, store,
  render: h => h(App),
})

export default vm

