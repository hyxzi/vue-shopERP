<template>
  <div class="login-container">
    <div class="login-box">
      <!--登录logo-->
      <div class="logo-img">
        <img src="../assets/logo.png">
      </div>
      <!--登陆表单-->
      <el-form label-width="0px" class="login-form" :model="loginForm" :rules="loginRules" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input type="text" v-model="loginForm.username" placeholder="请输入账号"
                    prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"
                    prefix-icon="iconfont icon-mima"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="loginFormRefs">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {request} from "../request";

  export default {
    name: "Login",
    data() {
      return {
        //设置登录表单
        loginForm: {
          username: 'admin',
          password: '123456'
        },
        //设置表单验证
        loginRules: {
          username: [
            {required: true, message: '请输入登录账号', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入登录密码', trigger: 'blur'},
            {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      loginFormRefs() {
        this.$refs.loginFormRef.resetFields()
      },
      login() {
        this.$refs.loginFormRef.validate( value => {
          if (!value) {
            return
          }
          let loginForm = this.loginForm
         return  request({url:'login', data:{username:loginForm.username,password:loginForm.password}, method: 'post'}).then(res=>{
           if (res.meta.status !== 200) {
             return this.$message.error('登陆失败' + res.meta.msg)
           } else {
             this.$message.success('登陆成功')
             sessionStorage.setItem('token', res.data.token)
             this.$router.push('/home')
           }
          }).catch(err=>{
            console.log(err)
          })
          /*const {data: res} = await this.$axios.post('login', this.loginForm)
          */

        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .login-container {
    background-color: #2b4b6b;
    height: 100%;

    .login-box {
      height: 300px;
      width: 450px;
      background-color: #fff;
      border-radius: 5px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      .logo-img {
        width: 130px;
        height: 130px;
        border-radius: 50%;
        padding: 10px;
        background-color: white;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 10px #bbbcbc;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .login-form {
        position: absolute;
        bottom: 0;
        box-sizing: border-box;
        padding: 0 20px;
        width: 100%;

        .btns {
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
</style>
