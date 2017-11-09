//  Vue全家桶
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
//  引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
//  加载框架
import Config from './App.config' //  加载全局配置
// import Layout from './apps/admin/layout' //  加载框架
import Units from './public-resource/plugins/units' //  加载单体插件
//  引入iconfont
import './public-resource/iconfont/iconfont.css'
// 加载仓库 todo 需要进行重构 2017/11/9 by hoo
import store from './public-resource/store/store'
//  加载总路由
import router from './public-resource/router/router'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)

Vue.use(Config)
// Vue.use(Layout)
Vue.use(Units)

//  vue-router  跨域
// Vue.http.options.xhr = {withCredentials: true}

let vm = new Vue({
    el: '#app',
    router, store,
    render: h => h(App),
})

export default vm

