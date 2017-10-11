<template>
    <div id="app" class="tiramisu-body">
        <el-row type="flex" :gutter="10" justify="start">
            <!--导航-->
            <div v-if="$store.state.user.info.isLogin">
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
  import VueCookie from './assets/js/cookies'
  import VueStorage from './assets/js/storage'
  import component_adminBar from './components/admin_bar.vue'

  var serverUrl = '/server/'
  export default {
    data () {
      return {
        serverUrl: serverUrl,
      }
    },
    beforeCreate: function () {
      console.log('Tiramisu is init ... ')
      var user_token = VueCookie.get('user_token')
      //    服务器验证身份
      this.$http.get(serverUrl + 'admin/user/checkLogin', {'params': {'user_token': user_token}}).then(function (res) {
        console.log(res)
        this.$store.state.user.info = res.body
        VueStorage.set('user_info', res.body)
      })
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
