/*
 * @Author: Azusakuo 
 * @Date: 2017-11-14 10:02:22 
 * @Last Modified by: Azusakuo
 * @Last Modified time: 2017-11-17 13:34:33
 * 
 */

/**
 * @deprecated 本文件已由proload取代
 */
/* eslint-disable no-console */

let Layout = {}

require('./preload')

Layout.install = function (Vue, options) {
    //  修改页面标题
    let settings = {
        title: '',
        ticket: '',
    }
    for (let property in options) {
        if (options.hasOwnProperty(property)) {
            settings[property] = options[property] // 使用 options 的配置
        }
    }
    Vue.prototype.$pageTitle = (title) => {
        settings.title = title
    }

    Vue.prototype.$loadVue = (msg) => {
        console.log(msg)
    }

    Vue.mixin({
        beforeCreate: function () {
            settings.title = this.$route.meta.pageTitle || '';
        },
        created: function () {},

        updated: function () {
            //  更新界面时候更新网页标题
            setDocumentTitle(settings.title)

        },
        mounted: function () {
            //  挂载时更新网页标题
            setDocumentTitle(settings.title)

        }
    })
}
module.exports = Layout

let setDocumentTitle = title => {
    document.title = 'tiramisuCMS' + ('-' + title || '');
}