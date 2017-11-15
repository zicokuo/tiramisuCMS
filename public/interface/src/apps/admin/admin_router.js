import admin_user_router from './admin_user_router'
import design_router from './../design/design_router'
import Cache from '../../public-resource/modules/cache'

require('./preload')

let default_router = {
    title: '管理台首页',
    url: '/admin/index',
    path: '',
    name: 'admin_index',
    component: () => import('./components/home.vue'),
    meta: {
        pageTitle: '管理台首页'
    },
}

function P () {
    this.ex = function (){console.log('触发了')}
    this.ex2 = function (){setInterval(function () {P.ex()}, 2000)}
}

//  过滤规则 - 用户登录/注册/登出
let pathFilterRegExp = new RegExp('(/admin/user)/(login|register|logout)', 'i')

const admin_router = {
    key: 'admin_default',
    path: '/admin',
    component: () => import('./components/frame.vue'),
    children: [admin_user_router, design_router, default_router],
    meta: {
        pageTitle: '后台'
    },
    //  后台路由守卫
    beforeEnter: (to, from, next) => {
        let user = Cache.get('user_info')
        if (pathFilterRegExp.test(to.path) || user !== null) {
            next()
        } else {
            next('/admin/user/login')
        }
    }

}

export default admin_router