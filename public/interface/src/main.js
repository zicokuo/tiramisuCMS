import * as _ from 'lodash'

import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import ElementUI, { Loading as E_Loading, Message as E_Message } from 'element-ui'
// import from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import App from './App.vue'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)

//  加载框架
import Layout from './public-resource/layout/layout'
import Dump from './public-resource/plugins/dump'

import Cache from './public-resource/modules/cache'

Vue.use(Layout)
Vue.use(Dump)
//  引入iconfont
import './public-resource/iconfont/iconfont.css'

//  vue-router  跨域
Vue.http.options.xhr = {withCredentials: true}
//  vue-resource  发送调试
Vue.http.interceptor.before = (request, next) => {
  let loading = E_Loading.service({fullscreen: true, text: '通信中'})
  request.params.user_ticket = Cache.get('user_ticket')
  this.$dump(request.params)
  next((response) => {
    response.result = JSON.parse(response.data)
    //  接口错误预处理
    if (response.status !== 200) {
      let msg = '远端接口出错..'
      this.$dump(msg)
      E_Message.error(msg)
    } else if (response.result.code !== 1) {
      let msg = response.result.msg || '通信无效'
      this.$dump(msg)
      E_Message.error(msg)
    }
    //  至少500ms反馈时间
    // setTimeout(() => {loading.close()}, 500)
    loading.close()
  })
}

import store from './public-resource/store/store'
import router from './public-resource/router/router'

var vm = new Vue({
  el: '#app',
  router, store,
  render: h => h(App),
})

export default vm

