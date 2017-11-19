// import Cache from './../modules/cache.js';
let Cache = require('../modules/cache');
let Units = {};

Units.install = function(Vue) {
	//  数组合并 - 浅拷贝
	Vue.prototype.$array_merge = (array1, array2) => {
		for (let key in array2) {
			array1[key] = array2[key];
		}
		return array1;
	};
	/**
     * 快捷缓存操作
     * @param {*} name 
     * @param {*} value 
     * @param {*} exp 
     * @param {*} remove 
     */ Vue.prototype.$cache = (
		name,
		value,
		exp = 7200,
		remove = false
	) => {
		if (remove) {
			return Cache.rem(name);
		}
		return value ? Cache.set(name, value, exp) : Cache.get(name);
	};
};
module.exports = Units;
