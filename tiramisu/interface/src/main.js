// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//  加载路由
import VueRouter from 'vue-router'
//  加载状态管理
import VueResource from 'vue-resource'
//  加载饿了么
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

//  开启vue调试
Vue.config.debug = true
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Element)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  VueRouter,
  VueResource,
  render: h => h(App),
  template: '<App/>',
  components: {App}
})
