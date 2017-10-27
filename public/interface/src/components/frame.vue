<template>
    <div class="frame">
        <el-row type="flex" :gutter="24">
            <el-col style="width: 360px">
                <component_admin_bar v-if="$store.getters.isLogin"></component_admin_bar>
            </el-col>
            <el-col >
                <component_admin_navigation></component_admin_navigation>
                <transition name="slide-fade" mode="out-in">
                    <keep-alive>
                        <router-view style="padding:1em"></router-view>
                    </keep-alive>
                </transition>
            </el-col>
        </el-row>
    </div>
</template>
<script>
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  import component_admin_bar from './admin_bar.vue'
  import component_admin_navigation from '../components/admin/navigation.vue'
  import Cache from '../public-resource/modules/cache'
  import { Loading as E_Loading, Message as E_Message } from 'element-ui'

  export default {
    name: 'frame',
    components: {component_admin_bar, component_admin_navigation},
    data () {
      return {}
    },
    methods: {},
    beforeCreate () {
      //  frame 框架初始化

      //  vue-router  跨域
      Vue.http.options.xhr = {withCredentials: true}
      //  vue-resource  预发送拦截器
      Vue.http.interceptor.before = (request, next) => {
        let loading = E_Loading.service({fullscreen: true, text: '通信中'})
        request.params.user_ticket = Cache.get('user_ticket')
        this.$dump(request.params)
        next((response) => {
          response.result = JSON.parse(response.data)
          //  接口错误预处理
          if (response.status !== 200) {
            let msg = '远端接口出错..'
            this.$dump(msg)
            E_Message.error(msg)
          } else if (response.result.code !== 1) {
            let msg = response.result.msg || '通信无效'
            this.$dump(msg)
            E_Message.error(msg)
          }
          //  至少500ms反馈时间
          // setTimeout(() => {loading.close()}, 500)
          loading.close()
        })
      }
    },
  }

</script>
<style scope>
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
        transition: all .1s ease;
    }

    .slide-fade-leave-active {
        transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */
    {
        transform: rotateX(-90deg);
        opacity: 0;
    }
</style>