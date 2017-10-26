import component_admin_home from '../../../components/admin/home.vue'
import component_user_enter from '../../../components/user/user_entry.vue'

const admin_router = [
  //  管理后台 - 用户登录
  {name: 'user_login', path: '/admin/user/:method', component: component_user_enter, props: true},
  //  管理后台 - 首页
  {name: 'dashboard', path: '/admin/:action/:method', component: component_admin_home, props: true},
]

export default admin_router