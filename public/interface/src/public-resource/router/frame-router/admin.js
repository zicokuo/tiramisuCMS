import comp_frame from '../../../components/frame.vue';
const admin_router = {
    name: 'admin_router',
    path: '/admin*',
    component: comp_frame,
    children: [
        {
            title: '管理台首页',
            url: '/admin/index',
            path: '',
            name: 'admin_index',
            component: () => import('../../../components/admin/home.vue'),
            meta: {
                pageTitle: '管理台首页'
            },
        }
    ]
}
export default admin_router