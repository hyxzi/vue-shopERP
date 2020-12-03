<template>
  <el-dialog
    title="分配权限"
    :visible.sync="setRolesVisible"
    width="30%"
    :before-close="handleRoles"
  >
    <div>
      <p>当前用户:{{userInfo.username}}</p>
      <p>当前角色:{{userInfo.role_name}}</p>
      <el-select v-model="roleId" placeholder="请选择">
        <el-option
          v-for="item in rolesList"
          :key="item.id"
          :label="item.roleName"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="setRolesVisible = false">取 消</el-button>
    <el-button type="primary" @click="requestRoles">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  import {request} from "../../request";

  export default {
    name: "SetUserRoles",
    props:{
      setRolesVisible:false,
      userInfo:{}
    },
    data(){
      return {
        roleId:'',
        rolesList:[]
      }
    },
    mounted() {
      request({url:'roles'}).then(res=>{
        this.rolesList = res.data
      }).catch(err=>{
        console.log(err)
      })
    },
    methods:{
      //发送分配用户请求
      requestRoles(){
        let rolesId = parseInt(this.roleId)
        request({url:`users/${this.userInfo.id}/role`,data:{rid:rolesId},method:'put'}).then(res=>{
          //console.log(res)
          this.$emit('handSetUser',false)
        })
      },
      //关闭对话框
      handleRoles(){
        this.$emit('handSetUser',false)
      }
    }
  }
</script>

<style scoped>

</style>