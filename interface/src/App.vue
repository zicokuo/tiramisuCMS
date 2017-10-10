<template>
    <div id="app" class="tiramisu-body">
        <el-row type="flex" :gutter="10" justify="start">
            <!--{{ $options.components.UserStore.state.info.nick }}-->
            <!--导航-->
            <div v-if="$options.components.UserStore.state.info.isLogin">
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
  import cookies from './assets/js/cookies'
  import component_adminBar from './components/admin_bar.vue'

  import UserStore from './store/modules/user'

  var serverUrl = '/server/'
  export default {
    data () {
      return {
        serverUrl: serverUrl,
      }
    },
    beforeCreate: function () {
      console.log('Tiramisu is init ... ')
      var user_token = cookies.get('user_token')
      //    服务器验证身份
      this.$http.get(serverUrl + 'admin/user/checkLogin', {'params': {'user_token': user_token}}).then(function (res) {
        console.log(res)
        UserStore.commit('updateInfo', res.body)
        cookies.set('user_info', res.body, 1)
      })
    },
    components: {component_adminBar, UserStore},
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
