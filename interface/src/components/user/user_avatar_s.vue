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

  export default {
    data () {
      return {
        user: {}
      }
    }, mounted: function () {
      this.user = this.$store.state.info
    }, methods: {}
  }
</script>
