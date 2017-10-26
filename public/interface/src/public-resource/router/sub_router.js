import index_router from './sub-router/index'
import admin_router from './sub-router/admin'
import weixin_router from './sub-router/weixin'

import component_user_enter from '../../components/user/user_entry.vue'
import component_admin_home from '../../components/admin/home.vue'

// let sub_router = []
// sub_router = sub_router.concat(weixin_router, admin_router)
// sub_router = sub_router.concat(index_router)
// export default sub_router

const sub_router = [
  //  管理后台 - 用户登录
  {path: 'user/:method', component: component_user_enter, props: true},
  //  管理后台 - 首页
  {path:'index/:method', component: component_admin_home, props: true},
]
export default sub_router