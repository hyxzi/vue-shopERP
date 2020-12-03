<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="3">
          <el-button type="primary" @click="cateShowAdd">添加分类</el-button>
        </el-col>
      </el-row>
      <tree-table :data="cateList" :columns="columns" index-text="序号" :expand-type="false"
      :selection-type="false" show-index border class="tree">
        <!--是否有效-->
        <template slot="isok" slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.cat_deleted !== true" style="color: lawngreen"></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>
        <!--排序-->
        <template slot="order" slot-scope="scope">
          <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag type="warning" v-else>三级</el-tag>
        </template>
        <!--操作-->
        <template slot="opt" slot-scope="scope">
          <el-button icon="el-icon-edit" type="primary" size="mini">编辑</el-button>
          <el-button icon="el-icon-delete" type="danger" size="mini">删除</el-button>
        </template>
      </tree-table>
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
    <!--添加分类对话框-->
    <el-dialog
      title="添加用户"
      :visible.sync="addCateShow"
      width="30%"
      @close="addCateDialog"
    >
      <el-form :model="addCateInfo" :rules="addCateForm" ref="addCateFormRef" label-width="100px">
        <el-form-item label="分类：" prop="cat_name">
          <el-input type="text" v-model="addCateInfo.cat_name">
          </el-input>
        </el-form-item>
        <el-form-item label="父级分类：" prop="cat_name">
          <el-cascader
            v-model="parentCateKeys"
            :options="parentCateList"
            @change="cateKeysChange"
            :props="addCateProps"
            clearable
          >
          </el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addCateShow = false">取 消</el-button>
    <el-button type="primary" @click="addCate">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {request} from "../../request";

  export default {
    name: "Categories",
    data(){
      return {
        queryInfo: {
          query: '3',
          pagenum: 1,
          pagesize: 5
        },
        cateList:[],
        total:0,
        columns:[
          {
            label:'分类名称',
            prop:'cat_name'
          },
          {
            label: '是否有效',
            type:'template',
            template:'isok'
          },
          {
            label: '排序',
            type:'template',
            template:'order'
          },
          {
            label: '操作',
            type:'template',
            template:'opt'
          }
        ],
        addCateShow:false,
        //添加分类的数据表单对象
        addCateInfo:{
          cat_name:'',
          cat_pid:0,
          cat_level:0
        },
        //添加分类的数据表单校验规则
        addCateForm:{
          cat_name:[{required: true, message: '请输入新增分类', trigger: 'blur'}]
        },
        parentCateList:[],
        parentCateKeys:[],
        addCateProps:{
          value:'cat_id',
          label:'cat_name',
          children:'children',
          expandTrigger: 'hover',
          checkStrictly:true
        }
      }
    },
    created() {
      this.getCateList()
    },
    methods:{
      getCateList(){
        let queryInfo = this.queryInfo
        request({url:'categories',params:queryInfo,method:'get'}).then(res=>{
          this.cateList = res.data.result
          this.total = res.data.total
          //console.log(res)
        }).catch(error=>{
          console.log(error)
        })
      },
      //页面显示数据改变后更新页面数据
      handleSizeChange(newSize){
        this.queryInfo.pagesize = newSize
        this.getCateList()
      },
      //页数改变后更新页面数据
      handleCurrentChange(newNum){
        this.queryInfo.pagenum = newNum
        this.getCateList()
      },
      //弹出添加分类对话框，获取
      cateShowAdd(){
        this.addCateShow = true
        request({url:'categories',params:{type:2}}).then(res=>{
          this.parentCateList = res.data
        }).catch(err=>{
          console.log(err)
        })
      },
      cateKeysChange(){
        if(this.parentCateKeys.length > 0){
          this.addCateInfo.cat_pid = this.parentCateKeys[this.parentCateKeys.length - 1]
          this.addCateInfo.cat_level = this.parentCateKeys.length
          return
        }else {
          this.addCateInfo.cat_pid = 0
          this.addCateInfo.cat_level = 0
        }
      },
      addCate(){
        let addCateInfo = this.addCateInfo
        request({url:'categories',data:addCateInfo,method:'post'}).then(res=>{
          if(res.meta.status == 201){
            this.$message.success('添加分类成功')
            this.addCateShow = false
            this.getCateList()
          }else {
            this.$message.error(`${res.meta.msg}`)
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      addCateDialog(){
        this.$refs.addCateFormRef.resetFields()
        this.parentCateKeys = []
        this.addCateInfo.cat_pid = 0
        this.addCateInfo.cat_level = 0
      }
    }
  }
</script>

<style scoped>
.tree{
  margin: 15px 0;
}
  .el-cascader{
    width: 100%;
  }
</style>