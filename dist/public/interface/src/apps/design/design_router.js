'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _frame = require('../../components/frame.vue');

var _frame2 = _interopRequireDefault(_frame);

var _design_index = require('./components/design_index.vue');

var _design_index2 = _interopRequireDefault(_design_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root_url = '/admin/design';

var design_router = {
    title: '标志定制小程序管理',
    name: 'design_router',
    path: root_url + '*',
    url: '/admin/design',
    component: _frame2.default,
    children: [{
        title: '首页',
        url: root_url + '/index',
        path: '',
        name: 'design_index',
        component: _design_index2.default,
        meta: {
            pageTitle: '首页'
        }
    }, {
        title: '客户申请',
        url: root_url + '/list',
        path: 'list',
        name: 'design_list',
        meta: {
            pageTitle: '客户申请'
        }
    }]
};
exports.default = design_router;
//# sourceMappingURL=design_router.js.map