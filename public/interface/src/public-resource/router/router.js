import VueRouter from 'vue-router'
import Cache from '../modules/cache'
import routers from './sub_router'

// let Config = import('./../../config.js')
// let routers = require('./sub_router')
//  过滤规则 - 用户登录/注册/登出
let pathFilterRegExp = new RegExp('(/admin/user)/(login|register|logout)', 'i')

const TiramisuRouter = new VueRouter({
    base: '/diavision/public/',
    mode: 'history',
    routes: routers,
    activate (transition) {
        this.pre_params = this.$route.query
        transition.next()
    },
})
//  路由守卫 - 登录检测
TiramisuRouter.beforeEach((to, from, next) => {
    let user = Cache.get('user_info')
    if (pathFilterRegExp.test(to.path) || user !== null) {
        next()
    } else {
        next('/admin/user/login')
    }
})
export default TiramisuRouter