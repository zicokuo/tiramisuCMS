/*
 * @Author: Azusakuo 
 * @Date: 2017-11-14 10:00:21 
 * @Last Modified by: Azusakuo
 * @Last Modified time: 2017-11-20 17:28:31
 */
/* eslint-disable no-console */
//  vue-resource  预发送拦截器
import Vue from 'vue';
import VueRoute from 'vue-router';
import VueResource from 'vue-resource';
import {
    Loading,
    Message
} from 'element-ui';

let Cache = require('../../public-resource/modules/cache');

Vue.use(VueRoute);
Vue.use(VueResource);

let preLoad = {};
preLoad.install = function (Vue, options) {
    //  修改页面标题
    let settings = {
        title: '',
        ticket: ''
    };
    for (let property in options) {
        if (options.hasOwnProperty(property)) {
            settings[property] = options[property]; // 使用 options 的配置
        }
    }
    Vue.prototype.$pageTitle = title => {
        settings.title = title;
    };

    Vue.prototype.$loadVue = msg => {
        console.log(msg);
    };

    Vue.mixin({
        beforeCreate: function () {
            //  匹配路由中的页面标题
            let title = '';
            try {
                title = this.$route.meta.pageTitle;
            } catch (e) {
                console.log(e);
            }
            settings.title = title;
        },
        created: function () {},

        updated: function () {
            //  更新界面时候更新网页标题
            setDocumentTitle(settings.title);
        },
        mounted: function () {
            //  挂载时更新网页标题
            setDocumentTitle(settings.title);
        }
    });
};

Vue.use(preLoad);

// 框架接口返回数据预处理
Vue.http.interceptor.before = (request, next) => {
    let loading = Loading.service({
        fullscreen: true,
        text: '通信中'
    });
    request.params.user_signature = Cache.get('user_signature');
    next(response => {

        loading.close();
        console.log(response);

        try {
            response.body = JSON.parse(response.body);
        } catch (e) {
            console.log('返回数据无需json处理');
        }

        //  接口错误预处理
        if (response.ok === true && response.body.code === 1) {
            console.log('服务器通信反馈:' + response.body.msg);
        } else {
            Message.error(response.body.msg);
            console.log('通讯出错..');
        }

        //  至少500ms反馈时间
        setTimeout(() => {
            loading.close();
        }, 2000);
        return response;
    });
};

let setDocumentTitle = title => {
    document.title = 'tiramisuCMS' + ('-' + title || '');
};