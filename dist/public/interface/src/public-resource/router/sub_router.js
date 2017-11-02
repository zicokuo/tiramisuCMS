'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _admin = require('./frame-router/admin');

var _admin2 = _interopRequireDefault(_admin);

var _index = require('./frame-router/index');

var _index2 = _interopRequireDefault(_index);

var _weixin = require('./frame-router/weixin');

var _weixin2 = _interopRequireDefault(_weixin);

var _user = require('./frame-router/user');

var _user2 = _interopRequireDefault(_user);

var _design_router = require('../../apps/design/design_router');

var _design_router2 = _interopRequireDefault(_design_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  合并子路由
var subRouters = [_index2.default, _design_router2.default, _weixin2.default, _user2.default, _admin2.default];

// module.exports = subRouters

//  引入子路由
exports.default = subRouters;
//# sourceMappingURL=sub_router.js.map