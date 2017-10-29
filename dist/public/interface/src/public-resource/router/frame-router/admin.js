'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _frame = require('../../../components/frame.vue');

var _frame2 = _interopRequireDefault(_frame);

var _home = require('../../../components/admin/home.vue');

var _home2 = _interopRequireDefault(_home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var admin_router = {
    name: 'admin_router',
    path: '/admin*',
    component: _frame2.default,

    children: [{
        path: '',
        name: 'home',
        component: _home2.default,
        meta: {
            pageTitle: 'tiramisuCMS'
        }
    }]
};
exports.default = admin_router;
//# sourceMappingURL=admin.js.map