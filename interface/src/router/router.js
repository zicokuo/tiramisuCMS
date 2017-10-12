import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './../store/store'
import VueStorage from './../assets/js/storage'
import VueCookie from './../assets/js/cookies'

import component_userEntry from './../components/admin/user_entry.vue'
import component_home from './../components/admin/home.vue'

Vue.use(VueRouter)
// 引入组件

export default new VueRouter({
  store,
  mode: 'history',
  routes: [
    {path: '/home/:action/:method', name: 'route', component: component_home, props: true},
    {
      path: '/user/entry/:mode',
      name: 'user_login',
      component: component_userEntry,
      beforeEnter: function (to, from, next) {
        var user_info = VueStorage.get('user_info')
        if (user_info.isLogin == true) {
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
        var user_info = VueStorage.get('user_info')
        if (user_info.isLogin == true) {
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