<template>
  <el-table :data="tabsList" border>
    <el-table-column type="expand"></el-table-column>
    <el-table-column type="index"></el-table-column>
    <el-table-column label="属性名称" prop="attr_name"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row)">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteCate(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import {request} from "../../request";

  export default {
    name: "TableList",
    props:{
      tabsList:{
        type:Array,
        default:[]
      },
    },
    methods:{
      edit(index){
        request({url:`categories/${index.cat_id}/attributes/${index.attr_id}`}).then(res=>{
          this.$emit('edit',true,res.data)
        })
      },
      deleteCate(info){
        request({url:`categories/${info.cat_id}/attributes/${info.attr_id}`,method:'delete'}).then(res=>{
          if(res.meta.status === 200){
            this.$message.success("删除成功")
            this.$emit('deleteCate',true)
          }
          console.log(res)
        })
      }
    }
  }
</script>

<style scoped>

</style>