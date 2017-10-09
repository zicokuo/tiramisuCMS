<template>
    <div id="userLogin">
        <el-form ref="form" :model="form" label-width="80px">
            <h1>用户登录</h1>
            <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
  export default {
    name: 'userLogin',
    data () {
      return {}
    },
    components: {},
    methods: {}
  }
</script>
<style scoped>

</style>