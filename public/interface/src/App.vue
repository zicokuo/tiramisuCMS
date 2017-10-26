<template>
    <div id="app" class="tiramisu-body">
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
  import Config from './config'
  import Cache from './public-resource/modules/cache'
  import ElementUI, { Loading as E_Loading, Message as E_Message } from 'element-ui'

  export default {
    name: 'app',
    data () {
      return {}
    },
    beforeCreate: function () {
      let vm = this
      let ticket = Cache.get('user_ticket')
      this.$dump(ticket)
      let url = Config.SERVER_URL + 'server/get_ticket'
      //    初始化检票
      if (ticket === null) {
        vm.$http.get(url).then(res => {
          if (res.body.code === 1) {
            Cache.set('user_ticket', res.body.data.user_ticket)
          }
        }).catch(e => {
          E_Loading.service().close()
          this.$alert('服务连接失败', '警告', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'error',
                message: `action: ${ action }`
              })
            }
          })
        })
      }
      //    同步Cache和Storage
      let user = Cache.get('user_info')
      this.$store.dispatch('USER_UPDATE', user)
    }
  }
</script>

<style lang="sass">
    @import "public-resource/sass/base"
</style>
