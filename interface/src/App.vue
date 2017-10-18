<template>
    <div id="app" class="tiramisu-body">
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
  import Config from './config'
  import Cache from './plugins/cache'
  import { dump } from './plugins/dump'

  export default {
    name: 'app',
    data () {
      return {}
    },
    beforeCreate: function () {
      let vm = this
      let ticket = Cache.get('user_ticket')
      dump(ticket)
      let url = Config.SERVER_URL + 'server/get_ticket'
      //    初始化检票
      if (ticket === null) {
        vm.$http.get(url).then(res => {
          if (res.body.code == 1) {
            Cache.set('user_ticket', res.body.data.user_ticket)
          }
        }).catch(e => {
          dump(e)
        })
      }
    }
  }
</script>

<style lang="sass">
    @import "./assets/sass/base.scss"
</style>
