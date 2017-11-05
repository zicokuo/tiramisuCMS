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
    import ElementUI, {Loading as E_Loading, Message as E_Message} from 'element-ui'

    export default {
        name: 'app',
        data () {
            return {}
        },
        beforeCreate: function () {
            let vm = this
            let ticket = Cache.get('user_ticket')
            this.$dump(ticket)
//            let url = Config.SERVER_URL + 'server/get_ticket'
            let url = vm.$getUrl('adminUrl') + 'server/get_ticket'
            //    初始化检票
            if (ticket === null) {
                vm.$http.get(url).then(res => {
                    if (res.body.code === 1) {
                        Cache.set('user_ticket', res.body.data.user_ticket)
                    }
                }).catch(e => {
                    let loading = E_Loading.service({fullscreen: true, text: '服务器链接失败'})
                    loading.close()
                    console.log(e)
                    this.$message.error('服务器链接失败')
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
