<template>
  <div class="register-container">
    <div class="top-title">
      <h1><a><svg-icon icon-class="logo" /></a></h1>
      <p>slogan</p>
    </div>
    <el-form class="ruleForm login-form" status-icon :model="form" :rules="rules" ref="form" label-position="left" label-width="70px">
      <div class="title-container">
        新用户注册
      </div>
      <el-form-item prop="mobile" label="帐号">
        <el-input name="userName" type="text" :maxlength="11" v-model="form.userName" placeholder="请输入用户名" />
      </el-form-item>

      <el-form-item prop="password" label="密码">
        <el-input name="password" :type="passwordType" :maxlength="18" v-model="form.password" placeholder="请输入密码" />
      </el-form-item>

      <el-form-item prop="checkPass" label="确认密码">
        <el-input name="checkPass" :type="passwordType" :maxlength="18" v-model="form.checkPass" placeholder="请再次输入密码" />
      </el-form-item>

      <el-button :loading="loading" :disabled="submit" :class="{'active':checked==true}" @click.native.prevent="registerForm">注册</el-button>

      <p class="tips">已有账号？<span><router-link to="/login">立即登录</router-link></span></p>
    </el-form>
  </div>
</template>

<script>
  import { register, list } from '@/api/user'
  import { faultHandler } from '@/utils'
  export default {
    name: 'register',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (value === '' || value === undefined) {
          callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (value.length > 18) {
          callback(new Error('请输入6-18位，包含字母数字的密码'))
        } else if (value.length < 6) {
          callback(new Error('请输入6-18位，包含字母数字的密码'))
        } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,20}$/.test(value)) {
          callback(new Error('请输入6-18位，包含字母数字的密码'))
        } else {
          if (this.form.checkPass !== '') {
            this.$refs.form.validateField('checkPass')
          }
          callback()
        }
      }
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        rules: {
          userName: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePass }],
          checkPass: [{ required: true, trigger: 'blur', validator: validatePass2 }]
        },
        form: {
          userName: '',
          password: '',
          checkPass: ''
        },
        submit: false,
        disabled: true,
        checked: true,
        passwordType: 'password',
        loading: false,
        home: ''
      }
    },
    watch: {
      checked(newVal) {
        if (newVal === true) {
          this.disabled = false
          this.submit = false
        } else {
          this.submit = true
        }
      }
    },
    methods: {
      registerForm() {
        this.$refs.form.validate(valid => {
          if (valid) {
            let data = {}
            data.userName = this.form.userName
            data.password = this.form.password
            register(data).then(res => {
              this.$router.push({
                path: '/login',
                query: {userName: res.userName}
              })
            }).catch(faultHandler)
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#F5F7FA;
/* reset element-ui css */
.register-container {
  .top-title {
    text-align: center;
    font-size: 20px;
  }
  .el-input {
    display: inline-block;
    height: 36px;
    width: 234px;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 0 9px 10px;
      height: 36px;
      border: 1px solid #eeeeee;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fff inset !important;
      }
    }
    .el-input__suffix {
      top: -4px;
    }
  }
  .el-form-item {
    color: #454545;
    margin-top: 30px;
    margin-bottom: 0;
    border-radius: 2px;
    border: none;
    .el-form-item__content {
      line-height: 0;
    }
    span {
      width: 60px;
      display: inline-block;
    }
  }
  .ruleForm {
    .el-form-item__label {
      padding: 0;
      font-weight: normal;
      color: #353535;
    }
    .el-form-item__label:before {
      content: '';
      color: unset;
      margin-right: 0;
    }
  }
  .el-button {
    width: 100%;
    height: 36px;
    line-height: 34px;
    color: #fff;
    font-size: 14px;
    border-radius: 2px;
    background: #F5AA9F;
    padding: 0;
    margin-top: 30px;
    border: none;
  }
  .is-disabled:hover {
    color: #fff;
    cursor: not-allowed;
    background-color: #F5AA9F;
  }
  .active {
    background: #694b4b;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#F5F7FA;
$white:#ffffff;
$dark_gray:#889aa4;

.register-container {
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
      margin: 20px 0 0 0;
      span {
         color:#694b4b;
      }
    }
  }
  .title-container {
    text-align: center;
  }
}
</style>
