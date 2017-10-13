<template>
    <div id="app" class="tiramisu-body">
        <el-row type="flex" :gutter="10" justify="start">
            <!--导航-->
            <div v-if="$store.state.info.isLogin">
                <transition name="el-fade-in-linear">
                    <component_adminBar></component_adminBar>
                </transition>
            </div>
            <el-col>
                <transition name="slide">
                    <router-view></router-view>
                </transition>
            </el-col>
        </el-row>
    </div>
</template>
<script>

  import TiramisuConfig from './config'
  import TiramisuServer from './server'
  import TiramisuStorage from './plugins/storage'
  import component_adminBar from './components/admin_bar.vue'

  export default {
    data () {
      return {}
    },
    beforeCreate: function () {
      //    检票
      let user_ticket = TiramisuStorage.get('user_ticket') //  取票

      if (user_ticket === null) {
        let api_url = TiramisuConfig.SERVER_API_URL + '/get_ticket'
        this.$http.get(api_url).then((res) => {
          if (res.body.code === 1) TiramisuStorage.set('user_ticket', res.body.data.user_ticket)
        })
      }

      //    同步Storage与Vuex的user_info
      let user_info = TiramisuStorage.get('user_info')
      this.$store.dispatch('USER_UPDATE', user_info)

    },
    components: {component_adminBar},
    methods: {},
    watch: {
      '$route.path': function (e) {
        console.log(e)
      }
    }
  }
</script>

<style lang="sass">
    @import "./assets/sass/base.scss"
</style>
