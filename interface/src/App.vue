<template>
    <div id="app">
        <el-row type="flex">
            <el-col>
                <AdminBar></AdminBar>
            </el-col>
            <el-col>
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import VueRouter from 'vue-router'
  import AdminBar from './components/admin_bar.vue'
  import UserStore from './store/user'
  const router = new VueRouter({
    routes: [
      {path: '*', component: AdminBar}
    ]
  })

  var serverUrl = '/server/'

  export default {
    data () {
      return {
        serverUrl: serverUrl,
      }
    },
    router,
    components: {AdminBar},
    beforeCreate: function () {
      console.log('Tiramisu is init ... ')
      this.$http.post(serverUrl + 'admin/user/checkLogin').then(function (res) {
        console.log(res)
        UserStore.commit('updateInfo',res.body);
      })
    },
    methods: {}
  }
</script>

<style lang="sass">
    @import "./assets/sass/base.scss"
</style>
