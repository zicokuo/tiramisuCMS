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
            <!--用户窗口模块-->
            <comp_user_box class="userWindow"></comp_user_box>
            <!--首页-->
            <template v-for="(menu,index) in router_menu.children">
                <el-submenu name="menu.key" :index="index+''" v-if="menu.children" :key="index+''">
                    <template slot="title">
                        <span slot="title">{{ menu.title || menu.label || menu.key || '无标题' }}</span>
                    </template>
                    <el-menu-item-group :title="menu.title+'功能'">
                        <template v-for="(submenu,subindex) in menu.children">
                            <el-menu-item :route="{path:submenu.url}" :index="index+'-'+subindex":key="index+'-'+subindex"
                                          v-if="submenu.path.length>1">
                                <i v-if="submenu.icon" :class="submenu.icon"></i>
                                {{ submenu.title }}
                            </el-menu-item>
                        </template>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item v-else :route="{path:menu.url}" :index="index+''" :key="index+''">
                    <i v-if="menu.icon" :class="menu.icon"></i>
                    {{ menu.title }}
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script>
import ElMenuItem from "../../../../node_modules/element-ui/packages/menu/src/menu-item.vue";
import routers from "./../admin_router";

let Cache = () => import("../../../public-resource/modules/cache");
let comp_user_box = () => "./user/user_avatar_s.vue";
export default {
  components: { ElMenuItem, comp_user_box },
  name: "adminMenu",
  data() {
    return {
      router_menu: [],
      isCollapse: false
    };
  },
  beforeMount() {
    //  挂载前,加载路由设置
    this.router_menu = routers;
    console.log(this.router_menu);
  },
  methods: {
    handleOpen: event => {
      console.log("菜单" + event + "打开");
    },
    handleClose: event => {
      console.log("菜单" + event + "打开");
    },
    adminBarWidthToggle: function() {
      this.isCollapse = !this.isCollapse;
    },
    userLogout: function() {
      Cache.rem("user_info");
      this.$router.push("/admin");
    }
  },
  mounted() {
    console.log("左侧管理菜单加载");
  }
};
</script>
<style scope lang="scss">
.admin-bar {
  transition: all 1s ease;
  &:not(:hover) {
    animation-fill-mode: forwards;
    animation-delay: 3s;
    animation: myfadeOut 1s;
    opacity: 0.5;
  }
  &:hover {
    opacity: 1;
  }
}

@keyframes myfadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.5;
  }
}

.admin-bar:not(.el-menu--collapse) {
  width: 300px;
}

.userWindow {
  padding: 1em;
  width: auto;
}

.admin-bar.el-menu--collapse .userWindow .nickName {
  display: none;
}
</style>