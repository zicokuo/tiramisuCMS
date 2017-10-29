'use strict';

var Layout = {};

Layout.install = function (Vue, options) {
    //  修改页面标题
    var settings = {
        title: '',
        ticket: ''
    };
    for (var property in options) {
        settings[property] = options[property]; // 使用 options 的配置
    }
    Vue.prototype.$pageTitle = function (title) {
        settings.title = title;
    };

    Vue.mixin({
        updated: function updated() {
            //  更新界面时候更新网页标题
            document.title = settings.title || 'TiramisuCMS';
        },
        mounted: function mounted() {
            //  挂载时更新网页标题
            document.title = settings.title || 'TiramisuCMS';
        }
    });
};
module.exports = Layout;
//# sourceMappingURL=layout.js.map