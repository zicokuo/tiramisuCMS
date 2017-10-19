<template>
    <div class="weixin_configuration">
        <h3>{{pageTitle}}</h3>
        <hr>
        <el-form ref="form" :model="config" label-width="120px">
            <el-form-item label="活动名称">
                <el-input v-model="config.weixin_name"></el-input>
            </el-form-item>
        </el-form>

    </div>
</template>
<script>
  import Server from './../../server'

  export default {
    name: 'weixin_configuration',
    data () {
      return {
        pageTitle: '微信接入参数配置',
        config: {}
      }
    },

    methods: {}
  }
</script>
<style scope>
    .weixin_configuration {
    }
</style>