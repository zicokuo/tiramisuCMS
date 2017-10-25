<template>
    <div class="info">{{content}}
        <img :src="avatar" alt=""/>
    </div>
</template>
<script>
  import avatar from './../../assets/logo.png'

  export default {
    name: 'info',
    data () {
      return {
        content: 'I\'m weixin info',
        avatar: avatar,
      }
    },
    methods: {}
  }
</script>
<style scope>
    .info {
    }
</style>