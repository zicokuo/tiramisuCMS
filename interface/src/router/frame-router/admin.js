import Cache from '../../plugins/cache'
import { dump } from '../../plugins/dump'

import component_frame from './../../components/frame.vue'
import component_user_entry from './../../components/user/user_entry.vue'
import component_dashboard from './../../components/admin/home.vue'

const admin_router = {
  name: 'admin',
  path: '/admin*',
  component: component_frame,
  beforeEnter: (to, from, next) => {
    dump(to.path,'目标地址')
    dump(from.path,'访问地址')

    if (to.path === from.path) {
      return
    }
    let user = Cache.get('user_info')
    dump(user, '用户缓存')
    if (user === null || to.path === '/admin/user/login') {
      dump('当前访客没有登录', '路由验证用户登录')
      // next('/admin/user/login')
    }
    // 放行
    next()
  },
  children: [
    {
      path: 'user/login',
      component: component_user_entry
    },
    {
      path: '',
      component: component_dashboard
    }
  ]
}
export default admin_router