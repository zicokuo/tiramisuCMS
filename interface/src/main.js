import * as _ from 'lodash'
import { dump } from './plugins/dump'

import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import App from './App.vue'
import store from './store/store'
import router from './router/router'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)
//  引入iconfont
import './assets/font_icon/iconfont.css'

import Cache from './plugins/cache'
//  vue-router  跨域
Vue.http.options.xhr = {withCredentials: true}
//  vue-resource  发送调试
Vue.http.interceptor.before = (request, next) => {
  request.params.user_ticket = Cache.get('user_ticket')
  next((response) => {
    if (response.state !== 200) {
      dump(response, '远端接口出错..')
    } else if (response.body.code !== 1) {
      dump(response, '通信无效')
    }
  })
}

var vm = new Vue({
  el: '#app',
  router, store,
  render:
    h => h(App),
})

export default vm

