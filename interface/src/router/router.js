// import Vue from 'vue'
import VueRouter from 'vue-router'
import Cache from './../plugins/cache'
// import Server from './../server'

import sub_router from './sub_router'
import component_frame from './../components/frame.vue'
import component_index from './../components/index/index.vue'

import admin_router from './frame-router/admin'
import index_router from './frame-router/index'

import { dump } from '../plugins/dump'

// Vue.use(VueRouter)
// 引入组件

let customs_routes = [
  //  后台过滤规则
  {
    name: 'admin',
    component: component_frame,
    path: '/admin*',
    beforeEnter: (to, from, next) => {
      dump('当前访问路径' + to.path)
      let user_info = Cache.get('user_info')
      dump(user_info !== null, '当前用户信息')
      if (user_info === null || user_info.isLogin === false || to.path !== '/admin/user/login') {
        dump('当前访客没有登录信息,跳转到登录页面..', '用户登录验证结果')
        next('/admin/user/login')
      } else {
        dump('用户' + user_info.account + '已经登录了,通过登录验证..', '用户登录验证')
        next()
      }

    }, children: sub_router,
  }, {
    name: 'index',
    component: component_index,
    path: '*',
    beforeEnter: (to, from, next) => {
      dump(to.path, '访问地址')
      next()
    }
  }
]

customs_routes = [admin_router, index_router]
dump(customs_routes)
export default new VueRouter({
  mode: 'history',
  routes: customs_routes,
  activate (transition) {
    this.pre_params = this.$route.query
    transition.next()
  }
})