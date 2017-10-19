<template>
    <div class="navigation">
        <el-tabs v-model="activeName" @tab-click="handleClick" editable>
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
      this.tabs = [{name: 'dashboard', label: '后台首页', path: '/admin/index'}]
    },
    beforeUpdate () {
    },
    methods: {
      handleClick (tab, event) {
        let tabNum = _.findIndex(this.tabs, {'name': tab.name})
        let path = this.tabs[tabNum].path
        this.$router.push({path: path})
      }
    },
    watch: {
      //    侦听路由变化,处理tabs
      '$route.path': function (href) {
        let newTabs = {name: this.$route.name, label: this.$route.name, path: href}
        dump(_.findLastIndex(this.tabs, newTabs.name))
        if (_.findLastIndex(this.tabs, {'name': newTabs.name}) < 1) {
          this.tabs.push(newTabs)
        } else {
        }
        this.activeName = newTabs.name

      }
    },

  }
  
</script>
<style scope>
    .navigation {
    }
</style>