let rootPath = '../../../components/';

const component_template = () => import('../../../components/template.vue')
const component_user_enter = () => import('../../../components/user/user_entry.vue')
const user_router = {
    name: 'user_router',
    path: '/admin/user*',
    component: () => import('../../../components/template.vue'),
    children: [{
        path: 'login',
        component: component_user_enter
    }]

}
export default user_router