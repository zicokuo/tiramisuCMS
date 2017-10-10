import Vue from 'vue'
import VueRouter from 'vue-router'

import UserStore from '../store/modules/user'
import VueCookie from './../assets/js/cookies'

import component_userEntry from './../components/admin/user_entry.vue'
import component_home from './../components/admin/home.vue'

Vue.use(VueRouter)
// 引入组件

export default new VueRouter({
  mode: 'history',
  routes: [
    {path: '/home/:action/:method', name: 'route', component: component_home, props: true},
    {
      path: '/user/entry/:mode',
      name: 'user_login',
      component: component_userEntry,
      beforeEnter: (to, from, next) => {
        var userInfo = VueCookie.get('user_info')
        console.log(userInfo)
        if (UserStore.state.info.isLogin == true) {
          next('/admin')
        } else {
          next()
        }
      }
    },
    {
      name: 'admin',
      component: component_home,
      path: '/admin*',
      beforeEnter: (to, from, next) => {
        if (UserStore.state.info.isLogin == true) {
          next()
        } else {
          next('/user/entry/login')
        }
      }
    },
  ],
  activate (transition) {
    this.pre_params = this.$route.query
    transition.next()
  }
})