import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
//  引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
//  加载框架
import Layout from './public-resource/layout/layout'
import Dump from './public-resource/plugins/dump'
import Units from './public-resource/plugins/units'
//  引入iconfont
import './public-resource/iconfont/iconfont.css'

import store from './public-resource/store/store'
import router from './public-resource/router/router'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)

Vue.use(Layout)
Vue.use(Dump)
Vue.use(Units)
let vm = new Vue({
    el: '#app',
    router, store,
    render: h => h(App),
})

export default vm

