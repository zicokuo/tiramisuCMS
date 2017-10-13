import Vue from 'vue'
import VueRouter from 'vue-router'
import VueStorage from '../plugins/storage'

import admin_router from './admin_router'

import component_home from './../components/admin/home.vue'

Vue.use(VueRouter)
// 引入组件

let routes = [
  //  后台过滤规则
  {
    name: 'admin',
    component: component_home,
    path: '/admin*',
    beforeEnter: (to, from, next) => {
      console.log(to.path)
      let user_info = VueStorage.get('user_info')
      if (user_info !== null && user_info.isLogin === true || to.path === '/admin/user/login') {
        next()
      } else {
        next('/admin/user/login')
      }
    }
  },
]

routes = admin_router.concat(routes)
export default new VueRouter({
  mode: 'history',
  routes: routes,
  activate (transition) {
    this.pre_params = this.$route.query
    transition.next()
  }
})