<template>
    <div class="navigation">
        <el-tabs v-model="activeName" @tab-click="changeTab" @tab-remove="removeTab">
            <el-tab-pane :key="item.name"
                         v-for="(item, index) in tabs"
                         :label="item.label || item.title"
                         :name="item.name"
                         :closable="index!=0">
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import * as _ from "lodash";
import router from "vue-router";
import routers from "./../admin_router";

export default {
  name: "navigation",
  data() {
    return {
      tabs: [],
      address: "",
      activeName: "home"
    };
  },
  beforeMount() {
    console.log(routers);
    this.tabs = [
      {
        label: "管理首页",
        name: "admin_index",
        path: "/admin/index",
        url: "/admin/index"
      }
    ];
    // this.tabs = [routers.children[routers.children.length - 1]];
  },
  beforeUpdate() {},
  methods: {
    changeTab(tab, event) {
      let tabNum = _.findIndex(this.tabs, { name: tab.name });
      this.$router.push({ path: this.tabs[tabNum].url || "/admin/index" });
    },
    //  关闭页
    removeTab(targetName) {
      if (targetName === "home") {
        return;
      }
      let tabs = this.tabs;
      let activeName = this.activeName;
      let nextTab;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.activeName = activeName;
      this.tabs = tabs.filter(tab => tab.name !== targetName);
      console.log(nextTab);
      this.$router.push({ path: nextTab.url });
    }
  },
  watch: {
    //    侦听路由变化,处理tabs
    "$route.path": function(href) {
      let curRouter = findRouteByPath(href, routers.children);
      console.log(curRouter);
      let newTabs = {
        name: this.$route.name,
        label: curRouter.title,
        path: href,
        url: curRouter.url
      };
      let isTabExist = _.findLastIndex(this.tabs, { name: newTabs.key }) < 1;
      let isHomeTab = href === "/admin/index";
      if (!isHomeTab && isTabExist) {
        this.tabs.push(newTabs);
      }
      this.activeName = newTabs.name;
      this.$pageTitle(newTabs.label || newTabs.name);
    }
  }
};

function findRouteByPath(path, routersArray) {
  for (let key in routersArray) {
    let item = routersArray[key];
    if (item.url === path) {
      return item;
    } else if (item.children) {
      let matched = findRouteByPath(path, item.children);
      if (matched && matched.url === path) {
        return matched;
      }
    }
  }
}
</script>
<style scope>
.navigation {
  margin-top: 1em;
}

.navigation i.el-icon-close:nth-of-type(1):before {
  display: none !important;
}
</style>