<template>
    <div id="userEntry" style="max-width: 600px;margin:auto">

        <el-form ref="form" :model="loginForm" label-width="120px" v-if="mode == 'login'">
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
                <el-button type="primary" v-on:click="navigator('/user/entry/register')">注册</el-button>
            </el-form-item>
        </el-form>
        <el-form ref="form" :model="registerForm" label-width="120px" v-if="mode == 'register'">
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
  import _ from 'lodash'
  import TiramisuConfig from './../../config'
  import UserStore from '../../store/modules/user'
  import VueCookie from './../../assets/js/cookies'

  export default {
    name: 'userEntry',
    data () {
      return {
        mode: 'login',
        loginForm: {
          account: '', password: '', autoLogin: false
        },
        registerForm: {
          account: '', password: '', repassword: '', phone: ''
        }
      }
    },
    components: {},
    ready: function () {
      var vm = this
      console.log(vm.$route.params.mode)
      var userInfo = VueCookie.get('user_info')
      console.log(userInfo)
      vm.mode = vm.$route.params.mode || 'login'
      if (UserStore.state.info.isLogin == true) {
        this.$router.push({path: '/admin/index'})
      }
    },
    watch: {
      'form.password': function (password) {
        this.passwordChange(password)
      },
      '$route.params.mode': function (mode) {
        this.mode = mode
      },
    },
    methods: {
      passwordChange: _.debounce(function (e) {
        console.log('简易加密->' + bpw + ',原密码->' + e)
        this.loginForm.password = bpw
      }, 500),
      //注册跳转
      navigator: function (url) {
        this.mode = 'register'
        this.$router.push({path: url})
      },
      //表单重设
      resetForm: function () {
        this.registerForm = {
          account: '', password: '', repassword: '', phone: ''
        }
      },
      //登录表单提交
      loginSubmit: function (event) {
        console.log(event)
        if (event.isTrusted) {
          if (this.loginForm.account.length < 3) {
            this.$notify({
              title: '警告',
              message: '请输入正确的登录账户',
              type: 'warning'
            })
            return false
          }
          var loginUrl = TiramisuConfig.serverUrl + 'user/userLogin'
          this.$http.get(loginUrl, {'params': this.loginForm}).then(function (res) {
//            todo 用户密码加密传输,不能明码传输
            if (res.body.code === 1) {
              this.$notify({title: '成功', message: res.body.data.nick + '登录成功!', type: 'success'})
              UserStore.commit('updateInfo', res.body.data)
              this.$router.push({path: '/admin/index'})
              return true
            }
            console.log(res)
          }, function (res) {
            this.$notify({title: '警告', message: '登录失败,请重试', type: 'warning'})
          })
        }
      },
      //注册表单提交
      registerSubmit: function (event) {

      }
    }
  }
</script>
<style scoped>

</style>