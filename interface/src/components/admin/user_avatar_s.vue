<template>
    <div>
        <p>{{user.nick}}</p>
    </div>
</template>
<script>
  import UserStore from './../../store/user'

  export default {
    data () {
      return {
        user: {}
      }
    }, beforeMount: function () {
      this.user = UserStore.state.info
    }
  }
</script>
