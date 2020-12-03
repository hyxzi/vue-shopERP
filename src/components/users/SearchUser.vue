<template>
  <el-row :gutter="20">
    <el-col :span="7">
      <el-input placeholder="请输入内容" v-model="searchUserInfo.query" class="input-with-select" clearable
                @clear="getUserList">
        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
      </el-input>
    </el-col>
    <el-col :span="3">
      <el-button type="primary" @click="showAdd">添加用户</el-button>
    </el-col>
  </el-row>
</template>

<script>
  import {request} from "../../request";

  export default {
    name: "SearchUser",
    props:{
      searchUserInfo:{}
    },
    data(){
      return {
        total: 0,
        dialogVisible:false
      }
    },
    methods:{
      getUserList() {
        let queryInfo = this.searchUserInfo
        request({url: 'users', params: queryInfo}).then(res => {
          this.$emit('searchUsers',res.data.users)
          this.total = res.data.total
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      showAdd(){
        this.$emit('showAdd',!this.dialogVisible)
      }
    }
  }
</script>

<style scoped>

</style>