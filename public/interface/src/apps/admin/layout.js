/* eslint-disable no-console */
import { Loading, Message } from 'element-ui'

let Layout = {}

require('./preload')

Layout.install = function (Vue, options) {
    //  修改页面标题
    let settings = {
        title: '', ticket: '',
    }
    for (let property in options) {
        if (options.hasOwnProperty(property)) {
            settings[property] = options[property]  // 使用 options 的配置
        }
    }
    Vue.prototype.$pageTitle = (title) => {
        settings.title = title
    }

    Vue.prototype.$loadVue = (msg) => {
        console.log(msg)
    }

    Vue.mixin({
        beforeCreate: function () {},
        created: function () {
            // //  检票
            // console.log('检查用户ticket')
            // let vm = this
            // let ticket = vm.$cache('user_ticket')
            // //    初始化检票
            // if (ticket === null) {
            //     let url = vm.$getUrl('adminUrl') + 'server/get_ticket'
            //     vm.$http.get(url).then(res => {
            //         if (res.body.code === 1) {
            //             vm.$cache('user_ticket', res.body.data.user_ticket)
            //         }
            //     }).catch(e => {
            //         let loading = Loading.service({fullscreen: true, text: '服务器链接失败'})
            //         loading.close(e)
            //         this.$message.error('服务器链接失败')
            //     })
            // }
            // //    同步Cache和Storage
            // let user = vm.$cache('user_info')
            // this.$store.dispatch('USER_UPDATE', user)
        },

        updated: function () {
            //  更新界面时候更新网页标题
            document.title = 'TiramisuCMS' + (' - ' + settings.title || '')
        },
        mounted: function () {
            //  挂载时更新网页标题
            document.title = 'TiramisuCMS' + (' - ' + settings.title || '')
        }
    })
}
module.exports = Layout

