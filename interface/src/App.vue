<template>
    <div id="app" class="tiramisu-body">
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
  export default {
    name: 'app',
    data () {
      return {}
    },
    beforeCreate: function () {
      dispatch
    }
  }
</script>

<style lang="sass">
    @import "./assets/sass/base.scss"
</style>
