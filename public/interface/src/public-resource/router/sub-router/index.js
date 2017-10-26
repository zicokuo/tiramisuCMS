import component_index from '../../../components/index/index.vue'

const admin_router = [
  //  管理后台 - 首页
  {name: 'index', path: '*', component: component_index, props: true},
  //  管理后台 - 用户登录
]

export default admin_router