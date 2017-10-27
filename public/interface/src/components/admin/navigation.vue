<template>
    <div class="navigation">
        <el-tabs v-model="activeName" type="card" @tab-click="changeTab" @tab-remove="removeTab">
            <el-tab-pane :key="item.name"
                         v-for="(item, index) in tabs"
                         :label="item.label"
                         :name="item.name"
                         :closable="index!=0">
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
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
        if (targetName == 'home') {
          return
        }
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
        this.$dump(this.$router)
        let newTabs = {name: this.$route.name, label: this.$route.name, path: href}
//        dump(_.findLastIndex(this.tabs, newTabs.name))
        let isTabExist = _.findLastIndex(this.tabs, {'name': newTabs.name}) < 1
        let isHomeTab = (href === '/admin/index')
        if (!isHomeTab && isTabExist) {
          this.tabs.push(newTabs)
        }
        this.activeName = newTabs.name
        this.$pageTitle(newTabs.name)
      }
    },

  }

</script>
<style scope>
    .navigation i.el-icon-close:nth-of-type(1):before {
        display: none !important;
    }
</style>