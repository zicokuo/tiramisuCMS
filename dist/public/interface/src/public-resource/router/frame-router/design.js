'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _frame = require('../../../components/frame.vue');

var _frame2 = _interopRequireDefault(_frame);

var _index = require('../../../components/design/index.vue');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var design_router = {
    name: 'design_router',
    title: '设计',
    path: '/admin/design*',
    component: _frame2.default,
    children: [{
        path: '',
        name: 'home',
        title: '设计首页',
        component: _index2.default
    }]
};
exports.default = design_router;
//# sourceMappingURL=design.js.map