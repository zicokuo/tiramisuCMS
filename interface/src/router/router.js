// import Vue from 'vue'
import VueRouter from 'vue-router'
import Storage from './../plugins/cache'
// import Server from './../server'

import routes from './sub_router'
import component_home from './../components/admin/home.vue'
import { dump } from '../plugins/dump'

// Vue.use(VueRouter)
// 引入组件

let customs_routes = [
  //  后台过滤规则
  {
    name: 'admin',
    component: component_home,
    path: '/admin*',
    beforeEnter: (to, from, next) => {
      dump('当前访问路径' + to.path)
      let user_info = Storage.get('user_info')
      if (user_info !== null && user_info.isLogin === true || to.path === '/admin/user/login') {
        dump('用户' + user_info.account + '已经登录了,通过登录验证..')
        next()
      } else {
        //  没有登录用户信息,则跳转至登录界面
        dump('当前访客没有登录信息,跳转到登录页面..')
        next('/admin/user/login')
      }
    }
  },
]

let routers = routes.concat(customs_routes)
// dump(routers, 'routers调试')
export default new VueRouter({
  mode: 'history',
  routes: routers,
  activate (transition) {
    this.pre_params = this.$route.query
    transition.next()
  }
})