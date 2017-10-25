<template>
    <div class="navigation">
        <el-tabs v-model="activeName" @tab-click="changeTab" @tab-remove="removeTab" editable closable>
            <!--<el-tab-pane label="用户管理" name="first">1</el-tab-pane>-->
            <el-tab-pane :key="item.name"
                         v-for="(item, index) in tabs"
                         :label="item.label"
                         :name="item.name">
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
  import { dump } from '../../plugins/dump'
  import * as _ from 'lodash'
  import router from 'vue-router'

  export default {
    name: 'navigation',
    data () {
      return {
        tabs: [],
        address: '',
        activeName: 'home'
      }
    },
    beforeMount () {
      this.tabs = [{name: 'home', label: '后台首页', path: '/admin/index'}]
    },
    beforeUpdate () {
    },
    methods: {
      changeTab (tab, event) {
        let tabNum = _.findIndex(this.tabs, {'name': tab.name})
        let path = this.tabs[tabNum].path
        this.$router.push({path: path})
      },
      //    关闭页
      removeTab (targetName) {
        let tabs = this.tabs
        let activeName = this.activeName
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }
        this.activeName = activeName
        this.tabs = tabs.filter(tab => tab.name !== targetName)
        this.$router.push({path: this.tabs[0].path})
      }
    },
    watch: {
      //    侦听路由变化,处理tabs
      '$route.path': function (href) {
        let newTabs = {name: this.$route.name, label: this.$route.name, path: href}
//        dump(_.findLastIndex(this.tabs, newTabs.name))
        let isTabExist = _.findLastIndex(this.tabs, {'name': newTabs.name}) < 1
        let isHomeTab = (href === '/admin/index')
        if (!isHomeTab && isTabExist) {
          this.tabs.push(newTabs)
        }
        this.activeName = newTabs.name
      }
    },

  }

</script>
<style scope>
    .el-tabs__item:first-of-type > .el-icon-close {
        display: none !important;
    }

</style>