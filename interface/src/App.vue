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

  const router = new VueRouter({
    routes: [
      {path: '*', component: AdminBar}
    ]
  })

  //  var serverUrl = 'http://127.0.0.1:80/tiramisu/public/'
  var serverUrl = '/server/'

  export default {
    data () {
      return {}
    },
    router,
    components: {AdminBar},
    beforeCreate: function () {
      console.log('Tiramisu is init ... ')
      this.$http.post(serverUrl + 'admin/user/checkLogin').then(function (res) {
        console.log(res)
      })
    },
    methods: {}
  }
</script>

<style lang="sass">
    @import "./assets/sass/base.scss"
</style>
