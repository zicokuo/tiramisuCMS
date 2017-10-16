import Vue from 'vue'
import VueRouter from 'vue-router'
import VueStorage from '../plugins/storage'
// import Server from './../server'

import routes from './sub_router'
import component_home from './../components/admin/home.vue'

Vue.use(VueRouter)
// 引入组件

let customs_routes = [
  //  后台过滤规则
  {
    name: 'admin',
    component: component_home,
    path: '/admin*',
    beforeEnter: (to, from, next) => {
      console.log(to.path)
      let user_info = VueStorage.get('user_info')
      // let user_info = Server.get_user({'user_ticket':VueStorage.get('user_ticket')})
      if (user_info !== null && user_info.isLogin === true || to.path === '/admin/user/login') {
        next()
      } else {
        next('/admin/user/login')
      }
    }
  },
]

let routers = routes.concat(customs_routes)
console.log(routers)
export default new VueRouter({
  mode: 'history',
  routes: routers,
  activate (transition) {
    this.pre_params = this.$route.query
    transition.next()
  }
})