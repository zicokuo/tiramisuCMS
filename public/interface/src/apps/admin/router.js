import admin_user_router from './routers/user_router';
import design_router from '../design/design_router';
import Cache from '../../public-resource/modules/cache';

require('./preload');

// 默认路由
let default_router = {
	title: '管理台首页',
	url: '/admin/index',
	path: '/admin*',
	name: 'admin_index',
	component: () => import('./components/home.vue'),
	meta: {
		pageTitle: '管理台首页'
	}
};

//  过滤规则 - 用户登录/注册/登出
let pathFilterRegExp = new RegExp('(/admin/user)/(login|register|logout)', 'i');

const admin_router = {
	key: 'admin_default',
	path: '/admin',
	component: () => import('./components/frame.vue'),
	children: [admin_user_router, design_router, default_router],
	meta: {
		pageTitle: '后台'
	},
	//  后台路由守卫
	beforeEnter: (to, from, next) => {
		let user = Cache.get('user_info');
		//  匹配用户登录路由
		if (pathFilterRegExp.test(to.path) || user !== null) {
			next();
		} else {
			next('/admin/user/login');
		}
	}
};

export default admin_router;
