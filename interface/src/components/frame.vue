<template>
    <div class="frame">
        <component_admin_bar></component_admin_bar>
        <router-view></router-view>
    </div>
</template>
<script>
  import component_admin_bar from './admin_bar.vue'

  export default {
    name: 'frame',
    components: {component_admin_bar},
    data () {
      return {}
    },
    methods: {}
  }
</script>
<style scope>
    .frame {
    }
</style>