<template>
  <div class="login-container">
    <div class="top-title">
      <h1><a><svg-icon icon-class="logo" /></a></h1>
      <p>slogan</p>
    </div>
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <div class="title-container">
        <span class="svg-title" style="font-size:15px">
          <svg-icon icon-class="users" />
        </span>
        <span>登录</span>
      </div>
      <!-- 手机号登录 -->
      <div>
        <el-form-item prop="userName">
          <span class="svg-container svg-container_login">
            <svg-icon icon-class="phone" />
          </span>
          <el-input name="userName" type="tel" v-model="loginForm.userName" :maxlength="11" autoComplete="on" placeholder="" />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container svg-container_logo-circle">
            <svg-icon icon-class="password" />
          </span>
          <el-input name="password" @keyup.enter.native="handleLogin" :maxlength="18" :type="passwordType" v-model="loginForm.password" autoComplete="on" placeholder="" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon v-if="isEye == false" icon-class="eye_on" />
            <svg-icon v-else icon-class="eye_off" />
          </span>
        </el-form-item>

        <el-form-item style="border:none" class="login-text">
          <el-col :span="12">
             <el-checkbox v-model="checked">记住密码</el-checkbox>
          </el-col>
          <el-col :span="12">
            <router-link to="/forget">忘记密码</router-link>
          </el-col>
        </el-form-item>
        <el-button :loading="loading" @click.native.prevent="handleLogin">登录</el-button>

        <el-form-item style="border:none">
          <p class="tips">没有账号？<span><router-link to="/register">立即注册</router-link></span></p>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
  import { login } from '@/api/user'
  import { faultHandler } from '@/utils'

  export default {
    name: 'login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (value === '' || value === undefined) {
          callback(new Error('请输入帐号'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value === '' || value === undefined) {
          callback(new Error('请输入正确的密码'))
        } else if (value.length > 18) {
          callback(new Error('请输入6-18位，包含字母数字的密码'))
        } else if (value.length < 6) {
          callback(new Error('请输入6-18位，包含字母数字的密码'))
        } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,20}$/.test(value)) {
          callback(new Error('请输入6-18位，包含字母数字的密码'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          userName: '',
          password: ''
        },
        loginRules: {
          userName: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        checked: false,
        passwordType: 'password',
        loading: false,
        isEye: false
      }
    },
    mounted() {
      this.getCookie()
      this.loginForm.userName = this.$route.query.userName
    },
    methods: {
      setCookie(c_name, c_pwd, exdays) {
        var exdate = new Date()
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)
        window.document.cookie = "userName" + "=" + c_name + ";path=/;expires="+exdate.toGMTString()
        window.document.cookie = "password" + "=" + c_pwd + ";path=/;expires="+exdate.toGMTString()
      },
      getCookie() {
        if (document.cookie.length > 0) {
          var arr = document.cookie.split('; ')
          for(var i = 0; i < arr.length; i++){
            var arr2 = arr[i].split('=')
            if(arr2[0] == 'userName') {
              this.loginForm.userName = arr2[1]
            } else if (arr2[0] == 'password') {
              this.loginForm.password = arr2[1]
            } else if (arr2[0] == 'checked') {
              if (arr2[1] == 1) {
                this.checked = true
              } else {
                this.checked = false
              }
            }
          }
        }
      },
      clearCookie() {
        this.setCookie('', '', -1)
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
          this.isEye = true
        } else {
          this.passwordType = 'password'
          this.isEye = false
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            // this.$store.dispatch('app/rememberPassword', this.checked).then(() => {}).catch(() => {})
            // if (this.checked === true) {
            //   this.setCookie(this.loginForm.userName, this.loginForm.password, 30)
            // } else {
            //   this.clearCookie()
            // }
            this.$store.dispatch('user/login', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({ path: '/' })
            }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#F5F7FA;

/* reset element-ui css */
.login-container {
  .top-title {
    text-align: center;
    font-size: 20px;
  }
  .el-input {
    display: inline-block;
    height: 36px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 36px;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fff inset !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid #eeeeee;
    color: #454545;
    margin-top: 30px;
    margin-bottom: 0;
    border-radius: 2px;
    .el-form-item__content {
      line-height: 0;
    }
  }
  .picinput {
    border: 1px solid #eeeeee;
    width: 180px;
  }
  .piccode {
    width: 100px;
    height: 38px;
    float: right;
    img {
      width: 100%;
      background: #ccc;
      height: 36px;
    }
  }
  .login-text {
    color: #B2B2B2;
    .el-col {
      height: 18px;
      line-height: 18px;
      font-size: 12px;
    }
    .el-checkbox {
      color: #B2B2B2;
      .el-checkbox__label {
        font-size: 12px;
      }
    }
    .el-col:last-child {
      text-align: right;
    }
  }
  .el-button {
    width: 100%;
    height: 36px;
    line-height: 34px;
    color: #fff;
    font-size: 14px;
    border-radius: 2px;
    background: #694b4b;
    padding: 0;
    margin-top: 30px;
    border: none;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#F5F7FA;
$white:#ffffff;
$dark_gray:#889aa4;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    width: 400px;
    margin: 0 auto;
    background: $white;
    border-radius: 10px;
    box-shadow:4px 0px 12px rgba(0,0,0,0.16);
    padding: 45px 50px;
    .kaweb-login-detail {
      text-align: center;
      margin-top:30px;
      .ka-code-img {
        height: 280px;
      }
    }
    .tips {
      color:#353535;
      font-size:12px;
      text-align:center;
      span {
         color:#694b4b;
      }
    }
    .warningTab {
      text-align: center;
      .svg-big {
        font-size: 60px;
        color: #F53A22;
      }
      p{
        font-size: 16px;
        color: #353535;
        margin: 30px 0 40px 0;
      }
      a {
        width: 300px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
    &_logo-circle {
      font-size: 20px;
    }
  }
  .svg-title {
    color:#c3c3c3;
    font-size: 18px;
  }
  .current {
    color: #694b4b;
  }
  .wechat {
    color: #70DB65;
  }
  .title-container {
    text-align: center;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
