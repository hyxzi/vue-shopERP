<template>
  <el-dialog
    title="修改用户"
    :visible.sync="editDialogVisible"
    width="30%"
    :before-close="handleEdit"
  >
    <el-form :model="editUserInfo" :rules="editFrom" ref="loginFormRef" label-width="100px">
      <el-form-item label="账号" prop="username">
        <el-input type="text" v-model="editUserInfo.username" disabled>
        </el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editUserInfo.email">
        </el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="editUserInfo.mobile">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="editVisible">取 消</el-button>
    <el-button type="primary" @click="editUsers">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  import {request} from "../../request";

  export default {
    name: "EditUsers",
    props:{
      editDialogVisible:false,
      //修改用户变单数据
      editUserInfo:{},
    },
    data() {
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
        //修改用户表单验证
        editFrom: {
          email: [
            {required: true, message: '请输入要修改的邮箱', trigger: 'blur'},
            {validator: checkEmail, trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请输入要修改的手机号', trigger: 'blur'},
            {validator: checkMobile, trigger: 'blur'}
          ]
        }
      }
    },

    methods:{
      //提交修改用户信息请求
      editUsers(){
        this.$refs.loginFormRef.validate(value => {
          if (!value) {
            return
          }
          let id = this.editUserInfo.id
          request({url: 'users/' + id, method: 'put', data: this.editUserInfo}).then(res => {
            this.$emit('editShow',!this.editDialogVisible)
            this.$message.success('修改成功')
          }).catch(err => {
            console.log(err)
          })
        })
      },
      editVisible(){
        this.$emit('editShow',false)
      },
      handleEdit(){
        this.$emit('editShow',false)
      }
    }
  }
</script>

<style scoped>

</style>