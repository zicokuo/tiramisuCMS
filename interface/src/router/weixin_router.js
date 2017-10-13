import component_wx_config from './../components/weixin/weixin_configuration.vue'

const weixin_router = [
  {
    //  微信配置
    name: 'weixin_configuration',
    path: '/admin/weixin/configuration',
    component: component_wx_config
  }, {
    //  微信自定义菜单
    name:'weixin_customs_bar',
    path:'/admin/weixin/configuration',
  }
]
export default weixin_router