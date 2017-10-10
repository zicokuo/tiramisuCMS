<template>
    <div class="tiramisu-text-center">
        <div v-if="user.avatar">
            <img :src="user.avatar" alt="userAvatar"/>
        </div>
        <div v-else class="">

        </div>
        <p>{{ user.nick }}</p>
    </div>
</template>
<script>
  import UserStore from './../../store/user'

  export default {
    data () {
      return {
        user: {}
      }
    }, mounted: function () {
      this.user = UserStore.state.info
    }, methods: {}
  }
</script>
