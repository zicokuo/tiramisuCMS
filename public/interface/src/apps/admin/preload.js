/* eslint-disable no-console */
//  vue-resource  预发送拦截器
import Vue from 'vue'
import VueRoute from 'vue-router'
import VueResource from 'vue-resource'
import { Loading, Message } from 'element-ui'
import Layout from './layout'
import Cache from '../../public-resource/modules/cache'

Vue.use(VueRoute)
Vue.use(VueResource)
Vue.use(Layout)

Vue.http.interceptor.before = (request, next) => {
    let loading = Loading.service({
        fullscreen: true,
        text: '通信中'
    })
    request.params.user_ticket = Cache.get('user_ticket')
    next((response) => {
        loading.close()
        console.log(response)
        // response.result = JSON.parse(JSON.parse(response.data))
        //  接口错误预处理
        if (parseInt(response.status) === 200 && parseInt(response.body.code) === 1) {

        } else {
            Message.error(response.body.msg || '通讯出错..')
            console.log(response.body.msg || '通讯出错..')
        }

        //  至少500ms反馈时间
        setTimeout(() => {
            loading.close()
        }, 2000)
        return response
    })
}