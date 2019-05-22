
<template>
    <div>
        <!-- <img  src="~@/assets/login.jpg" style="width: 100%;height: 100%;position: fixed;z-index: -1;"/> -->
        <img  src="~@/assets/bg.png" style="width: 100%;height: 100%;position: fixed;z-index: -1;"/>
        <!-- <img  src="~./pet.png" style="width: 422px; position: absolute;top: 250px;left: 20%;"/> -->
        <el-form  ref="form" style="position: absolute;top: 150px;right: 20%" :model="user" :rules="rules2"  label-position="left" label-width="0px" class="demo-ruleForm login-container">
            <h3 class="title">宠物医院药品管理系统</h3>
            <el-form-item prop="account">
                <el-input type="text" v-model="userAccount" auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
                <el-input type="password" v-model="password" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="login" :loading="logining">登录</el-button>
                <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {  login  } from '../api/api'
export default {
  name: "LoginPage",
  data() {
    return {
        userAccount: "",
        password: ""
    };
  },
  mounted() {
  },
  methods: {
      login : function () {
          var that = this;
          login({
              "userAccount":that.userAccount,
              "password":that.password
          }).then(data => {
              console.log(data);
              if (data.data.resultCode === 200){
                  if (data.data.resultValue){
                      sessionStorage.setItem('user', data.data.resultValue.userAccount);
                      that.$router.push({path: '/'});
                  }
              } else{
                  this.$message({
                      message: data.data.message,
                      type: 'Danger'
                  })
              }

          }).catch(function (error) {
              console.log(error)
          });
      }
  }
};
</script>

<style type="text/scss" scoped lang="scss">
    .login-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }
        .remember {
            margin: 0px 0px 35px 0px;
        }
    }
</style>
