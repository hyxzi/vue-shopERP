<template>
  <div>
    <!--面包屑导航-->
    <Breadcrumb />
    <!--内容-->
    <el-card class="box-card">
      <!--搜索用户-->
      <SearchUser :searchUserInfo="queryInfo" @searchUsers="showSearch" @showAdd="showAdd"/>
      <!--用户列表-->
     <UsersList :userList="usersList" :queryInfo="queryInfo" @editUser="showEdit" @deleteUser="deleteUser" @showSetRoles="showSetRoles"/>
      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <!--添加用户的对话框-->
    <AddUsers :addUserShow="dialogVisible" @showAdd="showAdd" @cancelShow="showAdd" :addUserInfo="addUser"/>
    <!--修改用户的对话框-->
    <EditUsers :editDialogVisible="editUsersVisible" :editUserInfo="editUser" @editShow="showEdit" @handleEdit="showEdit"/>
    <!--设置用户角色的对话框-->
    <SetUserRoles :setRolesVisible="setRolesVisible" :userInfo="userInfo" :rolesList="rolesList" @handSetUser="handSetUser" @handleRoles="handSetUser"/>
  </div>

</template>

<script>
  import Breadcrumb from "./Breadcrumb";
  import AddUsers from "./AddUsers";
  import EditUsers from "./EditUsers";
  import SearchUser from "./SearchUser";
  import {request} from "../../request";
  import SetUserRoles from "./SetUserRoles";
  import UsersList from "./UsersList";

  export default {
    name: "Users",
    data() {
      return {
        //页面第一次刷新请求参数
        queryInfo: {
          query: '',
          pagenum: 1,
          pagesize: 2
        },
        usersList: [],
        total: 0,
        dialogVisible: false,
        editUsersVisible:false,
        //添加用户表单数据
        addUser: {
          username: '',
          password: '',
          email: '',
          mobile: ''
        },
        //获取要修改的用户信息
        editUser:{},
        //控制设置角色对话框的隐藏与显示
        setRolesVisible:false,
        //分配角色的用户信息
        userInfo:{},
        //分配用户的角色id
        roleId:'',
        //分配用户的角色集合
        rolesList:[],
      }

    },
    components:{
      UsersList,
      SetUserRoles,
      Breadcrumb,
      AddUsers,
      EditUsers,
      SearchUser
    },
    created() {
      this.getUserList()
    },
    methods: {
      //获取用户数据列表
      getUserList() {
        let queryInfo = this.queryInfo
        request({url: 'users', params: queryInfo}).then(res => {
          this.usersList = res.data.users
          this.total = res.data.total
        }).catch(err => {
          console.log(err)
        })
      },
      //点击改变页面数据数量
      handleSizeChange(newSize) {
        this.queryInfo.pagesize = newSize
        this.getUserList()
      },
      //点击翻页
      handleCurrentChange(newPage) {
        this.queryInfo.pagenum = newPage
        this.getUserList()
      },

      //接受子组件的传值，关闭添加用户对话框
      showAdd(event){
        this.dialogVisible = event
        this.getUserList()
      },
      //接受子组件的传值，关闭修改用户对话框
      showEdit(able,list){
        this.editUsersVisible = able
        if(list){
          this.editUser = list
        }
        this.getUserList()
      },
      showSearch(list){
        this.usersList = list
      },
      handSetUser(able){
        this.setRolesVisible = able
        this.getUserList()
      },
      deleteUser(index){
        this.queryInfo.pagenum = index
        this.getUserList()
      },
      showSetRoles(userInfo, index){
        this.userInfo = userInfo
        this.setRolesVisible = index
      }
    }

  }
</script>

<style scoped>
</style>