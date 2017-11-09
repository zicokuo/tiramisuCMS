/* eslint-disable no-console */
//  vue-resource  预发送拦截器
import Vue from 'vue'
import VueRoute from 'vue-router'
import VueResource from 'vue-resource'
import { Loading, Message } from 'element-ui'
import Layout from './layout'

Vue.use(VueRoute)
Vue.use(VueResource)
Vue.use(Layout)

Vue.http.interceptor.before = (request, next) => {
    let loading = Loading.service({fullscreen: true, text: '通信中'})
    request.params.user_ticket = Cache.get('user_ticket')
    next((response) => {
        loading.close()
        response.result = JSON.parse(JSON.parse(response.data))
        //  接口错误预处理
        if (response.status !== 200 || response.result.code !== 1) {
            Message.error(response.result.msg || '通讯出错..')
            console.log(response.result.msg || '通讯出错..')
        }
        response.status == 200 ? console.log(response.body.msg) : ''
        //  至少500ms反馈时间
        setTimeout(() => {loading.close()}, 2000)
        return response
    })
}