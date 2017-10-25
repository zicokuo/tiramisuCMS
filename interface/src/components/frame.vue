<template>
    <div class="frame">
        <el-row type="flex" :gutter="24">
            <el-col style="width: 400px;min-width: 200px">
                <component_admin_bar v-if="$store.getters.isLogin"></component_admin_bar>
            </el-col>
            <el-col>
                <component_admin_navigation></component_admin_navigation>
                <transition name="slide-fade" mode="out-in">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </el-col>
        </el-row>
    </div>
</template>
<script>
  import VueRouter from 'vue-router'
  import component_admin_bar from './admin_bar.vue'
  import component_admin_navigation from '../components/admin/navigation.vue'
  import Cache from '../plugins/cache'

  export default {
    name: 'frame',
    components: {component_admin_bar, component_admin_navigation},
    data () {
      return {}
    },
    methods: {},
    beforeCreate () {
    }

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