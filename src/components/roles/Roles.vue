<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--角色列表-->
    <el-card class="box-card">
      <el-button type="primary" @click="dialogVisible = true">添加角色</el-button>
      <el-row>
        <el-table
          :data="rolesList"
          border
          stripe
        >
          <!--展开列-->
          <el-table-column type="expand">
            <template slot-scope="scope">
              <!---->
              <el-row v-for="(item, index) in scope.row.children" :key="item.id" :class="['bdbottom',index ===0 ?'bdtop' : '','flex']">
                <!--一级权限-->
                <el-col :span="5">
                  <el-tag>{{item.authName}}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <!---->
                <el-col :span="19">
                  <!--二级菜单-->
                  <el-row v-for="(item1, index1) in item.children" :key="item1.id" :class="[index1 === 0 ? '' : 'bdtop','flex']">
                    <el-col :span="6">
                      <el-tag type="success">{{item1.authName}}</el-tag>
                      <i class="el-icon-caret-right"></i>
                    </el-col>
                    <!--三级菜单-->
                    <el-col :span="18">
                      <el-tag closable type="warning" v-for="(item2, index2) in item1.children"
                              :key="item2.id" @close="deleteRoles(scope.row, item2.id)">{{item2.authName}}</el-tag>
                      <i class="el-icon-caret-right"></i>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>

            </template>
          </el-table-column>
          <!--索引列-->
          <el-table-column type="index"></el-table-column>
          <el-table-column label="角色名称"  prop="roleName"></el-table-column>
          <el-table-column label="角色描述"  prop="roleDesc"></el-table-column>
          <el-table-column label="操作"  >
            <template slot-scope="scope">
              <!--修改用户-->
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.row.id)" icon="el-icon-edit">编辑
              </el-button>
              <!--删除用户-->
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.id)" icon="el-icon-delete">删除
              </el-button>
                <!--分配权限-->
                <el-button
                  size="mini"
                  type="warning"
                  @click="handleSet( scope.row)" icon="el-icon-s-tools">分配权限
                </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
    <!--分配权限对话框-->
    <el-dialog
    title="分配权限"
    @close="setRightsKeys"
    :visible.sync="setDialogVisible"
    width="30%"
  >
      <el-tree
        :data="rightsList"
        show-checkbox
        default-expand-all
        :default-checked-keys="rightsKeys"
        node-key="id"
        ref="treeRef"
        :props="rolesTree">
      </el-tree>
    <span slot="footer" class="dialog-footer">
    <el-button @click="setDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="setRoles">确 定</el-button>
  </span>
  </el-dialog>
  </div>

</template>

<script>
  import {request} from "../../request";
  export default {
    name: "Roles",
    data(){
      return {
        rolesList:[],
        setDialogVisible:false,
        //权限列表
        rightsList:[],
        //权限树
        rolesTree:{
          label:'authName',
          children:'children'
        },
        //
        rightsKeys:[],
        rolesId:''
      }
    },
    created() {
      this.getRolesList()
    },
    methods:{
      //获取权限角色列表
      getRolesList(){
        request({url:'roles',method:'get'}).then(res=>{
          this.rolesList = res.data
        }).catch(err=>{
          console.log(err)
        })
      },
      //删除权限
      deleteRoles(scope, id){
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(()=>{
          return request({url:'roles/'+scope.id+'/rights/'+id,method:'delete'})
        }).then(res => {
          if(res.meta.status === 200){
           scope.children = res.data
          }
        }).then(()=>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //点击弹出分配权限对话框
      handleSet(roles){
        request({url:'rights/tree',method:'get'}).then(res=>{
          this.rightsList = res.data
          this.rolesId = roles.id
        }).catch(err=>{
          console.log(err)
        })
        this.getRightsKey(roles,this.rightsKeys)
        this.setDialogVisible = true
      },
      //通过递归，获取当前角色的所有三级权限
      getRightsKey(node, arr){
        if(!node.children){
          return arr.push(node.id)
        }
        node.children.forEach(v=>
        this.getRightsKey(v, arr))
      },
      //重置树形结构
      setRightsKeys(){
        this.rightsKeys = []
      },
      //点击分配权限
      setRoles(){
        let keys = [...this.$refs.treeRef.getCheckedKeys(),...this.$refs.treeRef.getHalfCheckedKeys()]
        const idStr = keys.join(',')
        let id = this.rolesId
        request({url:`roles/${id}/rights`,data:{rids:idStr},method:'post'}).then(res=>{
          console.log(res)
          this.getRolesList()
          this.setDialogVisible = false
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>
.el-tag{
  margin: 10px;
}
  .bdtop{
    border-top: 1px solid #eee;
  }
  .bdbottom{
    border-bottom: 1px solid #eee;
  }
  .flex{
    display: flex;
    align-items: center;
  }
</style>