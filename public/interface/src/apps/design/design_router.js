let root_url = '/admin/design'

const design_router = {
    title: '标志定制小程序管理',
    name: 'design_router',
    path: root_url + '*',
    url: '/admin/design',
    component: () => import('../../components/frame.vue'),
    children: [{
        title: '首页',
        url: root_url + '/index',
        path: 'home',
        name: 'design_index',
        component: () => import('./components/design_index.vue'),
        meta: {
            pageTitle: '首页'
        },
    }, {
        title: '客户申请',
        url: root_url + '/list',
        path: 'list',
        name: 'design_list',
        component: () => import('./components/design_submits.vue'),
        meta: {
            pageTitle: '客户申请'
        },
    }, {
        title: '客户列表',
        url: root_url + '/user',
        path: 'user',
        name: 'design_user',
        component: () => import('./components/design_user.vue'),
        meta: {
            pageTitle: '客户申请'
        },
    }, {
        title: '首页',
        url: root_url + '/index',
        path: '',
        name: 'design_index',
        component: () => import('./components/design_index.vue'),
        meta: {
            pageTitle: '首页'
        },
    }
    ]
}
export default design_router