const admin_user_router = {
    path: 'user',
    component: () =>
        import ('../../components/template.vue'),
    children: [{
        name: 'admin_user_login',
        url: 'login',
        title: '用户登录',
        path: 'login*',
        component: () =>
            import ('./components/user/user_entry.vue'),
        meta: {
            pageTitle: '用户登录'
        }
    }]
}
export default admin_user_router