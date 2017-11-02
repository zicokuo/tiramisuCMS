'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vuex = require('vuex');

var _vuex2 = _interopRequireDefault(_vuex);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _vueResource = require('vue-resource');

var _vueResource2 = _interopRequireDefault(_vueResource);

var _elementUi = require('element-ui');

var _elementUi2 = _interopRequireDefault(_elementUi);

require('element-ui/lib/theme-chalk/index.css');

var _App = require('./App.vue');

var _App2 = _interopRequireDefault(_App);

var _layout = require('./public-resource/layout/layout');

var _layout2 = _interopRequireDefault(_layout);

var _dump = require('./public-resource/plugins/dump');

var _dump2 = _interopRequireDefault(_dump);

require('./public-resource/iconfont/iconfont.css');

var _store = require('./public-resource/store/store');

var _store2 = _interopRequireDefault(_store);

var _router = require('./public-resource/router/router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  引入ElementUI
_vue2.default.use(_vuex2.default);
//  引入iconfont

//  加载框架

_vue2.default.use(_vueRouter2.default);
_vue2.default.use(_vueResource2.default);
_vue2.default.use(_elementUi2.default);

_vue2.default.use(_layout2.default);
_vue2.default.use(_dump2.default);

var vm = new _vue2.default({
    el: '#app',
    router: _router2.default, store: _store2.default,
    render: function render(h) {
        return h(_App2.default);
    }
});

exports.default = vm;
//# sourceMappingURL=main.js.map