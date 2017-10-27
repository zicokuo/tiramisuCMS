import * as _ from 'lodash'

import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

//  引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

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

import store from './public-resource/store/store'
import router from './public-resource/router/router'

var vm = new Vue({
  el: '#app',
  router, store,
  render: h => h(App),
})

export default vm

