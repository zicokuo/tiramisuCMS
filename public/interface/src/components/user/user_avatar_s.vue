<template>
    <div class="tiramisu-text-center">
        <img :src="user.avatar" alt="userAvatar"/>
        <p>{{ user.nick }}</p>
    </div>
</template>
<script>
  import avatar from '../../public-resource/images/avatar.png'

  export default {
    data () {
      return {
        user: {},
      }
    }, mounted: function () {
      this.user = this.$store.state.info
      this.user.avatar = avatar
    }, methods: {}
  }
</script>
<style scope>
    .testBox {
        width: 200px;
        height: 200px;
    }
</style>
