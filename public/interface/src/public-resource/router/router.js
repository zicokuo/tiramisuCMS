import VueRouter from 'vue-router'
import Cache from '../modules/cache'

//  引入子路由
import admin_router from './frame-router/admin'
import index_router from './frame-router/index'
import weixin_router from './frame-router/weixin'
import user_router from './frame-router/user'
import design_router from './frame-router/design'

//  过滤规则
let pathFilterRegExp = new RegExp('(/admin/user)/(login|register|logout)', 'i')

//  合并子路由
let customs_routes = [index_router, design_router, weixin_router, user_router, admin_router]

// dump(customs_routes)
const TiramisuRouter = new VueRouter({
  mode: 'history',
  routes: customs_routes,

  activate (transition) {
    this.pre_params = this.$route.query
    transition.next()
  },
})
TiramisuRouter.beforeEach((to, from, next) => {
  let user = Cache.get('user_info')
  if (pathFilterRegExp.test(to.path) || user !== null) {
    next()
  } else {
    next('/admin/user/login')
  }
})
export default TiramisuRouter