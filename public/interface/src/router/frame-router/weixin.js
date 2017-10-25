import component_frame from '../../components/frame.vue'
import component_configuration from '../../components/weixin/configuration.vue'
import component_info from '../../components/weixin/info.vue'

const weixin_router = {
  name: 'weixin_router',
  path: '/admin/weixin*',
  component: component_frame,
  children: [{
    name: 'configuration',
    path: 'configuration',
    component: component_configuration
  }, {
    name: 'info',
    path: 'info',
    component: component_info
  }
  ]
}
export default weixin_router