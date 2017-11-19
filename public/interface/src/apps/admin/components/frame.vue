<template>
    <div class="frame">
        <!--登录后加载框架-->
        <el-row id="logined" type="flex" :gutter="24">
            <el-col style="width: 360px" v-if="$store.getters.isLogin">
                <comp_admin_bar></comp_admin_bar>
            </el-col>
            <el-col>
                <comp_admin_navigation v-if="$store.getters.isLogin"></comp_admin_navigation>
                <transition name="slide-fade" mode="out-in">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </el-col>
        </el-row>
        <!--未登录不加载框架-->
    </div>
</template>
<script>
    //    加载框架预处理脚本
    require("./../preload.js");

    let comp_admin_bar = () => import("./admin_bar.vue");
    let comp_admin_navigation = () => import("./navigation.vue");

    export default {
        name: "frame",
        components: {comp_admin_bar, comp_admin_navigation},
        data() {
            return {};
        },
        methods: {},
        beforeCreate() {
            //  检票
            console.log("检查用户ticket开始");
            let vm = this;
            let ticket = vm.$cache("user_ticket");
            console.log("用户票据ticket:" + ticket);

            //  TODO: 需要解耦重构成框架预处理
            if (ticket === null) {
                //    初始化检票
                let url = vm.$getUrl("adminUrl") + "server/get_ticket";
                vm.$http.get(url).then(success_res => {
                    if (success_res.body.code === 1) {
                        vm.$cache("user_ticket", success_res.body.data.user_ticket);
                    }
                }, error_res => {
                    console.log(error_res);
                    this.$message.error("服务器链接失败");
                });
            }

            //    同步Cache和Storage
            this.$store.dispatch("USER_UPDATE", vm.$cache("user_info"));
            console.log("加载Frame.vue完毕");
        }
    };
</script>
<style scope>
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
        transition: all 0.1s ease;
    }

    .slide-fade-leave-active {
        transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter,
    .slide-fade-leave-to {
        transform: rotateX(-90deg);
        opacity: 0;
    }
</style>