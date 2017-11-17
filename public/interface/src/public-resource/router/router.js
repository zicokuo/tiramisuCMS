import VueRouter from 'vue-router'
// import Cache from './../modules/cache'
//  插件路由 @todo 解耦插件路由,将有config中配置 2017/11/9 by hoo
//  引入后台路由
import admin_router from './../../apps/admin/admin_router'
//  引入网站系统路由
import index_router from './../../apps/website/index_router'


const TiramisuRouter = new VueRouter({
    // base: config.is_dev ? '' : '/interface/',
    path: '*',
    mode: 'history',
    routes: [admin_router, index_router],
    activate (transition) {
        this.pre_params = this.$route.query
        transition.next()
    },
})
export default TiramisuRouter