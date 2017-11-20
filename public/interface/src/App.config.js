/*
 * @Author: mikey.zhaopeng 
 * @Date: 2017-11-19 00:24:55 
 * @Last Modified by: Azusakuo
 * @Last Modified time: 2017-11-20 18:56:36
 */

//  开发模式
let is_dev = 0;
//  根目录
let rootPath = require('path').resolve(__dirname, 'src');
//  服务器地址(api接口)
let serverUrl = is_dev ? '/server/' : 'http://design.logods.cn/public/index.php/';

let configObject = {
	//  开发模式
	dev: is_dev,

	//	系统默认加载admin和website2个模块

	//	后台模块
	adminApp: 'admin',
	//  后台模块中需要使用到的app模块名(文件夹名)
	adminApps: ['design'],
	//	前台模块
	websiteApp: 'website',
	//	前台模块中需要使用到app模块(文件夹名)
	websiteApps: [],

	//  项目根目录
	path: {
		rootPath: rootPath,
		publicPath: rootPath + 'public-resource/',
		appPath: rootPath + 'apps/'
	},
	//  项目地址
	url: {
		rootUrl: '/',
		serverUrl: serverUrl,
		adminUrl: serverUrl + 'admin/'
	},

	//  动态添加路径
	pushPath: (name, path) => {
		configObject.path[name] = path;
	},

	//  动态添加地址
	pushUrl: (name, path) => {
		configObject.url[name] = path;
	}
};
let config = {
	is_dev: is_dev
};
config.install = function(Vue) {
	/**
     * 获取配置中的路径
     * @param name
     * @returns {*|null}
     */
	Vue.prototype.$getPath = name => {
		return configObject.path[name] || null;
	};
	/**
     * 获取配置中的地址
     * @param name
     * @returns {*|null}
     */
	Vue.prototype.$getUrl = name => {
		return configObject.url[name] || null;
	};
	/**
     * 开发模式
     * @deprecated 被is_dev取代
     * @returns {number}
     */
	Vue.prototype.$isDev = () => {
		return is_dev;
	};
};

export default configObject;
module.exports = config;
