<template>
    <div class="tiramisu-text-center">
        <div class="userAvatarBox">
            <img :src="user.avatar" alt="userAvatar" class="tiramisu-avatar-s"/>
            <p class="nickName">{{ user.nick }}</p>
            <el-button @click="userLogout">登出</el-button>
        </div>
    </div>
</template>
<script>
  import avatar from '@/public-resource/images/user.png'

  export default {
    data () {
      return {
        user: {},
      }
    }, mounted: function () {
      console.log(avatar)
      this.user = this.$store.state.info
      this.user.avatar = this.user.avatar || avatar
    }, methods: {
      userLogout(){
        let vm = this;
        vm.$cache('')
      }
    }
  }
</script>
<style scope>
</style>
