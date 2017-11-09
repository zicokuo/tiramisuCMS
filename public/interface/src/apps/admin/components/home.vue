<template>
    <div>
        <h1>Welcome to Tiramisu CMS</h1>
        <div class="tiramisu-article">
            <p>Tiramisu CMS is a PHP & Vue2 project. It ues ThinkPHP and ElementUI framework.</p>
            <p class="tiramisu-article-brief">
                Author:Azusakuo
            </p>
            <p class="brief">
                21520993@qq.com
            </p>
        </div>
    </div>
</template>
<script>
    export default {
        mounted () {
            //  设置页面标题
            this.$pageTitle(this.$route.meta.pageTitle || '')
            this.$loadVue('加载home.vue')
        }
    }
</script>