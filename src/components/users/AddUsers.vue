<template>
    <el-dialog
      title="添加用户"
      :visible.sync="addUserShow"
      width="30%"
      :show-close="false"
      :before-close="handleClose"
      @close="closeDialogVisible"
    >
      <el-form :model="addUserInfo" :rules="ruleForm" ref="loginFormRef" label-width="100px">
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="addUserInfo.username">
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addUserInfo.password">
          </el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserInfo.email">
          </el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addUserInfo.mobile">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="cancelAdd">取 消</el-button>
    <el-button type="primary" @click="addUsers">确 定</el-button>
  </span>
    </el-dialog>

</template>

<script>
  import {request} from "../../request";

  export default {
    name: "AddUsers",
    props:{
      addUserShow:false,
      addUserInfo:{}
    },
    data(){
      //邮箱验证规则
      let checkEmail = (rule, vaule, cb) => {
        const resEmail = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/

        if (resEmail.test(vaule)) {
          return cb()
        }
        cb(new Error('请输入合法的邮箱'))
      }
      //手机验证规则
      let checkMobile = (rule, vaule, cb) => {
        const resMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
        if (resMobile.test(vaule)) {
          return cb()
        }
        cb(new Error('请输入合法的手机号'))
      }
      return {
        dialogVisible:false,
        //添加用户表单验证
        ruleForm: {
          username: [
            {required: true, message: '请输入新增用户的账号', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入新增用户的密码', trigger: 'blur'},
            {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入要修改的邮箱', trigger: 'blur'},
            {validator: checkEmail, trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请输入要修改的手机号', trigger: 'blur'},
            {validator: checkMobile, trigger: 'blur'}
          ]
        },
        //添加用户表单数据
        addUser: {
          username: '',
          password: '',
          email: '',
          mobile: ''
        }
      }
    },

    methods:{
      //重置表单
      closeDialogVisible(){
        this.$emit('showAdd',false)
        this.$refs.loginFormRef.resetFields()
      },
      //添加用户
      addUsers(){
        let addUser = JSON.stringify(this.addUserInfo)
        addUser = JSON.parse(addUser)
        console.log(addUser)
        this.$refs.loginFormRef.validate(value => {
          if (!value) {
            return
          }
          //发起网络请求
          request({url: 'users', data: addUser, method: 'post'}).then(res => {
            console.log(res)
            this.$emit('showAdd',!this.addUserShow)
            this.$message.success('添加用户成功')
          }).catch(err => {
            console.log(err)
          })
        })

      },
      //取消添加用户
      cancelAdd(){
        this.$emit('cancelShow',!this.addUserShow)
      },
      handleClose(){
        this.$emit('cancelShow',!this.addUserShow)
      }
    }
  }
</script>

<style scoped>

</style>