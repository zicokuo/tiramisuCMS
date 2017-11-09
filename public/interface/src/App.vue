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
    }
</script>

<style lang="sass">
    @import "public-resource/sass/base"
</style>
