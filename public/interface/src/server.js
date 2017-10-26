import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Config from './config'
import Cache from './public-resource/modules/cache'
import Axios from 'axios'
import { dump } from './public-resource/modules/dump'

Vue.use(VueRouter)
Vue.use(VueResource)

const Server = new Object({
  //  取票
  get_ticket: function (params) {
    let ticket
    //  尝试连接服务器进行身份确认
    let api_url = Config.SERVER_API_URL + '/get_ticket'
    Vue.$http.get(api_url, {'params': params}).then((res) => {
      //  接口返回数据必须包含res.data.user_ticket
      if (res.body.code === 1) {
        //  连接成功,更新本地储存的user_ticket,以作为前端换取数据的凭条
        ticket = res.body.data.user_ticket
        dump(ticket)
        // Cache.set('user_ticket', ticket)
      }
    })
    return ticket
  },
  //  获取用户
  get_user: function (params) {
    let api_url = Config.SERVER_API_URL + '/user/get_user'
    Vue.$http.get(api_url, {'params': params}).then(res => {
      if (res.body.code === 1) {
        Cache.set('user_info', res.body.data.user)
      }
    })
  },
  //  微信接口
  api_weixin: function (method, params) {
    let result
    let api_url = Config.SERVER_API_URL + '/weixin/' + method
    Vue.$http.get(api_url, {'params': params}).then(res => {
      Cache.set('weixin_config', res.body.data.config)
      result = res.body.data.config
    })
    return result
  },
})
export default Server