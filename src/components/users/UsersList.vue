<template>
  <el-row>
    <el-table
      :data="userList"
      border
      stripe
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column label="姓名" width="180" prop="username"></el-table-column>
      <el-table-column label="邮箱" width="180" prop="email"></el-table-column>
      <el-table-column label="电话" width="180" prop="mobile"></el-table-column>
      <el-table-column label="角色" width="180" prop="role_name"></el-table-column>
      <el-table-column label="状态" width="180" prop="mg_state">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!--修改用户-->
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row.id)" icon="el-icon-edit">
          </el-button>
          <!--删除用户-->
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)" icon="el-icon-delete">
          </el-button>
          <el-tooltip effect="dark" content="分配权限" placement="top" :enterable="false">
            <!--分配权限-->
            <el-button
              size="mini"
              type="warning"
              @click="setRoles(scope.row)" icon="el-icon-s-tools">
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
  import {request} from "../../request";

  export default {
    name: "UsersList",
    props:{
      userList:{
        type:Array,
        default:[]
      },
      queryInfo:{}
    },
    data(){
      return {
        editUsersVisible:false
      }
    },
    methods:{
      //修改用户状态
      userStateChange(state) {
        request({url: `users/${state.id}/state/${state.mg_state}`, method: 'put'}).then(res => {
          this.$message.success('修改状态成功')
        }).catch(err => {
          console.log(err)
        })
      },
      //修改用户,弹出修改框并获取用户数据
      handleEdit(id) {
        request({url: 'users/' + id, method: 'get'}).then(res => {
          this.$emit('editUser',true, res.data)
        }).catch(err => {
          console.log(err)
        })
      },
      //删除用户
      handleDelete(id) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(()=>{
          return request({url:'users/'+id,method:'delete'})
        }).then(res => {
          if(res.meta.status === 200){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        }).then(()=>{
         this.$emit('deleteUser',1)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //弹出分配用户角色
      setRoles(userInfo){
        this.$emit('showSetRoles',userInfo,true)
      },
    }
  }
</script>

<style scoped>

</style>