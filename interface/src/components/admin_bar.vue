<template>
    <div class="adminMenu">
        <el-menu default-active="1-4-1" class="admin-bar" @open="handleOpen" @close="handleClose"
                 :collapse="isCollapse" :router="true">
            <h2 align="center">标题</h2>
            <div v-on:click="adminBarWidthToggle">
                <i v-if="isCollapse" class="el-icon-taobao-all"></i>
                <i v-if="!isCollapse" class="el-icon-taobao-stop"></i>
            </div>
            <!--首页-->
            <el-menu-item index="0" :route="{path:'/index'}">
                <i class="el-icon-taobao-home_fill_light"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-taobao-post"></i>
                    <span slot="title">文章</span>
                </template>
                <el-menu-item-group>
                    <span slot="title">主要功能</span>
                    <el-menu-item index="1-1" :route="{path:'/post/list/2'}">
                        <i class="el-icon-taobao-sortlight"></i>
                        文章列表
                    </el-menu-item>
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
  import VueRouter from 'vue-router'
  import ElMenuItem from '../../node_modules/element-ui/packages/menu/src/menu-item.vue'

  export default {
    components: {ElMenuItem},
    name: 'adminMenu',
    data () {
      return {
        isCollapse: false
      }
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
      }
    }
  }
</script>
<style scope>
    .admin-bar:not(.el-menu--collapse) {
        width: 200px;
    }
</style>