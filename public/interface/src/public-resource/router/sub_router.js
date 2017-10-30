//  引入子路由
import admin_router from './frame-router/admin'
import index_router from './frame-router/index'
import weixin_router from './frame-router/weixin'
import user_router from './frame-router/user'
import design_router from '../../apps/design/design_router'

//  合并子路由
let subRouters = [index_router, design_router, weixin_router, user_router, admin_router]

// module.exports = subRouters

export default subRouters