'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _frame = require('../../../components/frame.vue');

var _frame2 = _interopRequireDefault(_frame);

var _configuration = require('../../../components/weixin/configuration.vue');

var _configuration2 = _interopRequireDefault(_configuration);

var _info = require('../../../components/weixin/info.vue');

var _info2 = _interopRequireDefault(_info);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var weixin_router = {
    title: '微信公众号',
    name: 'weixin_router',
    path: '/admin/weixin*',
    url: '/admin/weixin/index',
    component: _frame2.default,
    children: [{
        title: '微信配置参数',
        url: '/admin/weixin/configuration',
        name: 'weixin_configuration',
        path: 'configuration',
        component: _configuration2.default
    }, {
        title: '微信信息',
        url: '/admin/weixin/info',
        path: 'info',
        name: 'weixin_info',
        component: _info2.default
    }]
};
exports.default = weixin_router;
//# sourceMappingURL=weixin.js.map