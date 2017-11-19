/*
 * @Author: Zicokuo 
 * @Date: 2017-11-19 01:38:00 
 * @Last Modified by: Zicokuo
 * @Last Modified time: 2017-11-19 01:44:52
 */

//	user-router
let rootUrl = '/admin/user/';
export default {
    path: 'user',
    title: '用户',
    component: () => import('../components/template.vue'),
    children: [
        {
            name: 'admin_user_manager',
            url: rootUrl + 'manager',
            title: '用户管理',
            path: 'manager*',
            component: () => import('../components/user/user_manager.vue'),
            meta: {
                pageTitle: '用户登录'
            }
        },
        {
            name: 'admin_user_login',
            url: rootUrl + 'login',
            title: '用户登录',
            path: 'login*',
            component: () => import('../components/user/user_entry.vue'),
            meta: {
                pageTitle: '用户登录'
            }
        }
    ]
};
