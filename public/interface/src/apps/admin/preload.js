/*
 * @Author: Azusakuo 
 * @Date: 2017-11-14 10:00:21 
 * @Last Modified by: Azusakuo
 * @Last Modified time: 2017-11-14 10:01:41
 */
/* eslint-disable no-console */
//  vue-resource  预发送拦截器
import Vue from 'vue'
import VueRoute from 'vue-router'
import VueResource from 'vue-resource'
import {
    Loading,
    Message
} from 'element-ui'
// import Cache from '../../public-resource/modules/cache'
let Cache = require('../../public-resource/modules/cache')
Vue.use(VueRoute)
Vue.use(VueResource)

let preLoad = {};
preLoad.install = function (Vue, options) {
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
        beforeCreate: function () {},
        created: function () {

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

Vue.use(preLoad);

// 框架接口返回数据预处理
Vue.http.interceptor.before = (request, next) => {
    let loading = Loading.service({
        fullscreen: true,
        text: '通信中'
    })
    request.params.user_ticket = Cache.get('user_ticket')
    next((response) => {
        loading.close()
        console.log(response)

        try {
            response.body = JSON.parse(response.body)
        } catch (e) {
            console.log('返回数据无需json处理');
        }

        //  接口错误预处理
        if (response.ok === true && response.body.code === 1) {
            console.log(response.body.msg);
        } else {
            Message.error(response.body.msg)
            console.log('通讯出错..')
        }

        //  至少500ms反馈时间
        setTimeout(() => {
            loading.close()
        }, 2000)
        return response
    })
}