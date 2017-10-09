import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
//  引入iconfont
import './assets/font_icon/iconfont.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)

Vue.http.options.xhr = {withCredentials: true}

new Vue({
  el: '#app',
  render: h => h(App)
})

