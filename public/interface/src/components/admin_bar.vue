<!--suppress ALL -->
<template>
    <div class="adminMenu">
        <el-menu default-active="1-1" class="admin-bar" @open="handleOpen" @close="handleClose"
                 :collapse="isCollapse" :router="true">
            <h2 align="center">TCMS</h2>
            <div class="tiramisu-text-center" v-on:click="adminBarWidthToggle">
                <i v-if="isCollapse" class="el-icon-i--fullscreen tiramisu-icon"></i>
                <i v-if="!isCollapse" class="el-icon-i--narrow tiramisu-icon"></i>
            </div>
            <component_userAvatar class="admin-user">

            </component_userAvatar>
            <!--首页-->
            <template v-for="(menu,index) in router_menu">
                <el-submenu name="menu.name" :index="index+''" v-if="menu.children">
                    <template slot="title">
                        <span slot="title">{{ menu.title||menu.name }} {{ index }}</span>
                    </template>
                    <el-menu-item-group :title="menu.title+'功能'">
                        <template v-for="(submenu,subindex) in menu.children">
                            <el-menu-item :route="{path:submenu.url}" :index="index+'-'+subindex">
                                <i v-if="submenu.icon" :class="submenu.icon"></i>
                                {{ submenu.title }}
                            </el-menu-item>
                        </template>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item v-else :route="{path:menu.url}" :index="index+''">
                    <i v-if="menu.icon" :class="menu.icon"></i>
                    {{ menu.title }}
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script>
    import ElMenuItem from './../../node_modules/element-ui/packages/menu/src/menu-item.vue'
    import component_userAvatar from './user/user_avatar_s.vue'
    import Cache from '../public-resource/modules/cache'
    import routers from '../public-resource/router/sub_router'

    export default {
        components: {ElMenuItem, component_userAvatar},
        name: 'adminMenu',
        data () {
            return {
                router_menu: [],
                isCollapse: false
            }
        },
        beforeMount () {
//            this.router_menu = require('../public-resource/router/sub_router')
            this.router_menu = routers
            console.log(this.router_menu)
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
            },
        }
    }
</script>
<style scope>
    .admin-bar:not(.el-menu--collapse) {
        width: 300px;
    }

    .admin-bar.el-menu--collapse .admin-user .nickName {
        display: none;
    }
</style>