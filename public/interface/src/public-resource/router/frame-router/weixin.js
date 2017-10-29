import component_frame from '../../../components/frame.vue'
import component_configuration from '../../../components/weixin/configuration.vue'
import component_info from '../../../components/weixin/info.vue'

const weixin_router = {
    title: '微信公众号',
    name: 'weixin_router',
    path: '/admin/weixin*',
    url: '/admin/weixin/index',
    component: component_frame,
    children: [{
        title: '微信配置参数',
        url: '/admin/weixin/configuration',
        name: 'weixin_configuration',
        path: 'configuration',
        component: component_configuration
    }, {
        title: '微信信息',
        url: '/admin/weixin/info',
        path: 'info',
        name: 'weixin_info',
        component: component_info
    }
    ]
}
export default weixin_router