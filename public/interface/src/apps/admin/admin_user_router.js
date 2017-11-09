const admin_user_router = {
    name: 'admin_user_login',
    path: 'user/login*',
    url:'admin/user/login',
    title: '用户登录',
    component: () => import('./components/user/user_entry.vue'),
    meta: {
        pageTitle: '用户登录'
    }
}
export default admin_user_router