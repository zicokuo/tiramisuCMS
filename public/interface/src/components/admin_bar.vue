<template>
    <div class="adminMenu">
        <el-menu default-active="1-4-1" class="admin-bar" @open="handleOpen" @close="handleClose"
                 :collapse="isCollapse" :router="true">
            <h2 align="center">标题</h2>
            <div class="tiramisu-text-center" v-on:click="adminBarWidthToggle">
                <i v-if="isCollapse" class="el-icon-i--fullscreen tiramisu-icon"></i>
                <i v-if=" !isCollapse" class="el-icon-i--narrow tiramisu-icon"></i>
            </div>
            <component_userAvatar class="admin-user">

            </component_userAvatar>
            <!--首页-->
            <!--<block v-for="(menu,index) in router_menu" v-if="menu.children.length>1">-->
            <!--<el-submenu index="{{index}}">-->
            <!--<template slot="title">-->
            <!--<span slot="title">{{menu.title}}</span>-->
            <!--</template>-->
            <!--<el-menu-item-group>-->
            <!--<block v-for="( subMenu , subIndex ) in menu.children">-->
            <!--<el-menu-item index="{{index}}-{{subIndex}}" :route="{path:subMenu.path}">-->
            <!--{{subMenu.name}}-->
            <!--</el-menu-item>-->
            <!--</block>-->
            <!--</el-menu-item-group>-->
            <!--</el-submenu>-->
            <!--</block>-->
            <!--<block v-else>-->
            <!--<el-menu-item>{{menu}}</el-menu-item>-->
            <!--</block>-->
            <el-menu-item index="0" :route="{path:'/admin/index'}">
                <i class="el-icon-i--homepage_fill"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-taobao-post"></i>
                    <span slot="title">微信接入</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1" :route="{path:'/admin/weixin/info'}">
                        微信信息
                    </el-menu-item>
                    <el-menu-item index="1-2" :route="{path:'/admin/weixin/configuration'}">
                        <i class="el-icon-i--createtask"></i>
                        参数配置
                    </el-menu-item>
                    <span slot="title">基本配置</span>
                    <el-menu-item index="/home/list">
                        <i class="el-icon-taobao-sort"></i>
                        我也是文章列表
                    </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                    <el-menu-item index="/user/3">我是个人</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                    <span slot="title">选项4</span>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3">
                <i class="el-icon-setting"></i>
                <span slot="title">导航三</span>
            </el-menu-item>
        </el-menu>
    </div>

</template>
<script>
  import ElMenuItem from './../../node_modules/element-ui/packages/menu/src/menu-item.vue'
  import component_userAvatar from './user/user_avatar_s.vue'
  import Cache from '../public-resource/modules/cache'

  //    引入路由
  import design_router from '../public-resource/router/frame-router/design'

  export default {
    components: {ElMenuItem, component_userAvatar},
    name: 'adminMenu',
    data () {
      return {
        wx_menu: {},
        router_menu: [],
        isCollapse: false
      }
    },
    beforeMount () {
      this.router_menu = [design_router]
      console.log(this.router_menu[0])
    },
    methods: {
      handleOpen: event => {
        console.log('菜单' + event + '打开')
      },
      handleClose: event => {
        console.log('菜单' + event + '打开')
      },
      adminBarWidthToggle: function () {
        this.isCollapse = !this.isCollapse
      },
      userLogout: function () {
        Cache.rem('user_info')
        this.$router.push('/admin')
      }
    }
  }
</script>
<style scope>
    .admin-bar:not(.el-menu--collapse) {
        width: 300px;
    }

    .admin-bar.el-menu--collapse .admin-user {
        display: none;
    }
</style>