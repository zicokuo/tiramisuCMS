import component_frame from '../../components/frame.vue'
import component_design_index from './components/design_index.vue'

let root_url = '/admin/design'

const design_router = {
    title: '标志定制小程序管理',
    name: 'design_router',
    path: root_url + '*',
    url: '/admin/design',
    component: component_frame,
    children: [{
        title: '首页',
        url: root_url + '/index',
        path: '',
        name: 'design_index',
        component: component_design_index,
        meta: {
            pageTitle: '首页'
        },
    }, {
        title: '客户申请',
        url: root_url + '/list',
        path: 'list',
        name: 'design_list',
        component: component_design_index,
        meta: {
            pageTitle: '客户申请'
        },
    }
    ]
}
export default design_router