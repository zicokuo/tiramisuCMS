import Vue from 'vue'
import TiramisuConfig from './config'
import TiramisuStorage from './plugins/storage'

const Server = {
  get_ticket (params) {
    //  尝试连接服务器进行身份确认
    let api_url = TiramisuConfig.SERVER_API_URL + '/get_ticket'
    let ticket = null
    Vue.$http.get(api_url, {'params': params}).then((res) => {
      //  接口返回数据必须包含res.data.user_ticket
      if (res.body.code === 1) {
        //  连接成功,更新本地储存的user_ticket,以作为前端换取数据的凭条
        ticket = res.body.data.user_ticket
        console.log(ticket)
        TiramisuStorage.set('user_ticket', ticket)
      } else {
        console.log('连接服务器失败..')
      }
    })
    return ticket
  }
}
export default Server