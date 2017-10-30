import component_frame from '../../../components/frame.vue'
import component_dashboard from '../../../components/admin/home.vue'

const admin_router = {
    name: 'admin_router',
    path: '/admin*',
    component: component_frame,

    children: [
        {
            title: '管理台首页',
            url: '/admin/index',
            path: '',
            name: 'admin_index',
            component: component_dashboard,
            meta: {
                pageTitle: '管理台首页'
            },
        }
    ]
}
export default admin_router