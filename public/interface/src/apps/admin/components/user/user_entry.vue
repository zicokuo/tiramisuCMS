<template>
    <div id="userEntry" style="max-width: 600px;margin:auto">

        <el-form ref="form" :model="loginForm" label-width="120px" v-if="method == 'login'">
            <!--用户登录-->
            <h1 class="tiramisu-text-center">用户登录</h1>
            <el-form-item label="登录账户">
                <el-input v-model="loginForm.account" placeholder="请输入登录账户(邮箱或手机号).."></el-input>
            </el-form-item>
            <el-form-item label="登录密码">
                <el-input type="password" v-model="loginForm.password" placeholder="请输入至少6位的密码.." min="6"
                          max="10"></el-input>
            </el-form-item>
            <el-form-item label="自动登录">
                <el-switch on-icon-class="el-icon-i--right" off-icon-class="el-icon-i--close"
                           on-color="#13ce66" off-color="#ff4949"
                           v-model="loginForm.autoLogin"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="success" v-on:click="loginSubmit">登录</el-button>
                <el-button type="primary" v-on:click="navigator('/admin/user/register')">注册</el-button>
            </el-form-item>
        </el-form>
        <el-form ref="form" :model="registerForm" label-width="120px" v-if="method == 'register'">
            <!--用户注册-->
            <h1>用户注册</h1>
            <el-form-item label="注册账户">
                <el-input v-model="registerForm.account" placeholder="请输入登录账户(邮箱或手机号).."></el-input>
            </el-form-item>
            <el-form-item label="登录密码">
                <el-input type="password" v-model="registerForm.password" placeholder="请输入至少6位的密码.." min="6"
                          max="10"></el-input>
            </el-form-item>
            <el-form-item label="登录密码">
                <el-input type="password" v-model="registerForm.repassword" placeholder="请输入至少6位的密码.." min="6"
                          max="10"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input v-model="registerForm.phone" placeholder="请输入手机号.." min="11" max="=11"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" v-on:click="registerSubmit">提交注册</el-button>
                <el-button type="danger" v-on:click="resetForm">重设</el-button>
                <el-button type="primary" v-on:click="$router.go(-1)">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import _ from "lodash";
import Config from "../../../../config";
import Cache from "../../../../public-resource/modules/cache";

export default {
  name: "userEntry",
  data() {
    return {
      method: "login",
      loginForm: {
        account: "13828471634",
        password: "123456",
        autoLogin: true
      },
      registerForm: {
        account: "",
        password: "",
        repassword: "",
        phone: ""
      }
    };
  },
  components: {},
  watch: {
    "form.password": function(password) {
      this.passwordChange(password);
    },
    "$route.params.method": function(method) {
      this.method = method;
    }
  },
  mounted() {
    console.log("用户入口加载" + __filename + " has been mounted");
    let vm = this;
    //    同步Cache和Storage
    let user = vm.$cache("user_info");
    this.$store.dispatch("USER_UPDATE", user);
    vm.method = vm.$route.params.method || "login";
    if (vm.$store.getters.isLogin === true) {
      console.log(user.nick_name + "用户已经登录了,跳转到管理后台首页");
      vm.$router.push({ path: "/admin/index" });
    } else {
      return;
    }
  },
  methods: {
    passwordChange: _.debounce(function(e) {
      console.log("简易加密->" + bpw + ",原密码->" + e);
      this.loginForm.password = bpw;
    }, 500),
    //注册跳转
    navigator: function(url) {
      this.method = "register";
      this.$router.push({ path: url });
    },
    //表单重设
    resetForm: function() {
      this.registerForm = {
        account: "",
        password: "",
        repassword: "",
        phone: ""
      };
    },
    //登录表单提交
    loginSubmit: function(event) {
      let vm = this;
      if (event.isTrusted) {
        //    todo 表单验证,需要分离
        if (this.loginForm.account.length < 3) {
          this.$notify({ title: "警告", message: "请输入正确的登录账户", type: "warning" });
          return false;
        }
        let api_url = vm.$getUrl("adminUrl") + "user/userLogin";
        this.$http.get(api_url, { params: this.loginForm }).then(res => {
          //            todo 用户密码加密传输,不能明码传输
          console.log(res.body.msg);
          if (res.body.code === 1) {
            vm.$notify({
              title: "成功",
              message: res.body.data.nick + "登录成功!",
              type: "success"
            });
            let user = res.body.data;
            user.isLogin = true;
            vm.$store.dispatch("USER_UPDATE", user);
            Cache.set("user_info", user);
            //  登录成功跳转
            vm.$router.push({ path: "/admin/index" });
          }
          console.log(res);
        },
        function(res) {
          vm.$notify({ title: "警告", message: "登录失败,请重试", type: "warning" });
        });
      }
    },
    //注册表单提交
    registerSubmit: function(event) {}
  }
};
</script>
<style scoped>

</style>