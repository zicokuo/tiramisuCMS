<template>
    <div class="pops">
        <div class="title">
            {{ title }}
        </div>
        <div class="message">
            {{ msg }}
        </div>
        <div class="close_btn" v-on:click="closeSelf">
            关闭
        </div>
    </div>
</template>
<script>
  export default {
    name: 'pops',
    data () {
      return {
        title: 'Pops', msg: ''
      }
    },
    methods: {
      closeSelf: function (event) {
        this.msg = 'Opiss, i had been click!!'
      }
    }
  }
</script>
<style scoped>
    .pops {
        position: fixed;
        top: 50%;
    }

    .pops-hidden {
        display: none;
    }
</style>
