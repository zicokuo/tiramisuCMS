'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _cache = require('../modules/cache');

var _cache2 = _interopRequireDefault(_cache);

var _sub_router = require('./sub_router');

var _sub_router2 = _interopRequireDefault(_sub_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// let routers = require('./sub_router')
//  过滤规则 - 用户登录/注册/登出
var pathFilterRegExp = new RegExp('(/admin/user)/(login|register|logout)', 'i');

var TiramisuRouter = new _vueRouter2.default({
    mode: 'history',
    routes: _sub_router2.default,
    activate: function activate(transition) {
        this.pre_params = this.$route.query;
        transition.next();
    }
});
//  路由守卫 - 登录检测
TiramisuRouter.beforeEach(function (to, from, next) {
    var user = _cache2.default.get('user_info');
    if (pathFilterRegExp.test(to.path) || user !== null) {
        next();
    } else {
        next('/admin/user/login');
    }
});
exports.default = TiramisuRouter;
//# sourceMappingURL=router.js.map