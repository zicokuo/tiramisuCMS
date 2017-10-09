<template>
    <div id="app">
        <el-row type="flex">
            <TopMenu></TopMenu>
            <transition>
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
        </el-row>
    </div>
</template>

<script>
  import PopsBox from './components/pops.vue'
  import AdminBar from './components/adminBar.vue'
  import Articles from './components/test/articles.vue'
  import VueRouter from 'vue-router'

  const User = {
    template: '<div>{{ $route.params.id }}</div>'
  }

  const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
      // 动态路径参数 以冒号开头
      {path: '/user/:id', component: User},
      {path: '/home/*', component: Articles},
      {path: '/post/list/:page', component: Articles}
    ]
  })
  export default {
    router,
    name: 'app',
    data () {
      return {}
    },
    mounted: function () {
        //  初始化

    },
    components: {PopsBox, TopMenu: AdminBar, Articles}
  }
</script>

<style>
    @import './assets/iconfont/iconfont.css';

    #app {
        font-family: '微软雅黑', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    [class^="el-icon-taobao"], [class*=" el-icon-taobao"] {
        font-family: "iconfont" !important;
        font-size: 1.6em;
        /* 以下内容参照第三方图标库本身的规则 */
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
