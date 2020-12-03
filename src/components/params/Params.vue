<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区域-->
    <el-card>
      <!--提示语-->
      <el-alert
        title="注意:只允许为第三级分类设置参数"
        type="warning"
        :closable="false"
        show-icon>
      </el-alert>
      <!--级联选择器-->
      <el-row>
        <el-col>
          <span>请选择商品分类:</span>
          <el-cascader
            v-model="parentCateKeys"
            :options="cateList"
            @change="cateKeysChange"
            :props="addCateProps"
            clearable
          >
          </el-cascader>
        </el-col>
      </el-row>
      <!--标签页-->
      <el-tabs v-model="activeName" @tab-click="handleTabsClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" size="mini" :disabled="isDisable" @click="addTabs">添加参数</el-button>
          <!--动态参数表格-->
          <TableList :tabsList="tabsList" @edit="edit" :cateId="parentCateKeys" @deleteCate="deleteCate"/>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" size="mini" :disabled="isDisable" @click="addTabs">添加属性</el-button>
          <!--静态属性表格-->
          <TableList :tabsList="tabsList" @edit="edit" :cateId="parentCateKeys" @deleteCate="deleteCate"/>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <AddDialog :dialogVisible="dialogVisible" @closeAdd="closeAdd" :activeName="activeName"
               :parentCateKeys="parentCateKeys" />
    <EditDialog :activeName="activeName" :editDialogVisible="editDialogVisible" @closeEdit="edit"
                @edit="edit" :editInfo="editInfo"/>
  </div>
</template>

<script>
  import TableList from "./TableList";
  import {request} from "../../request";
  import AddDialog from "./AddDialog";
  import EditDialog from "./EditDialog";

  export default {
    name: "Params",
    components:{
      EditDialog,
      AddDialog,
      TableList
    },
    data(){
      return {
        cateList:[],
        parentCateKeys:[],
        addCateProps:{
          value:'cat_id',
          label:'cat_name',
          children:'children',
          expandTrigger: 'hover'
        },
        //选中的标签属性
        activeName:'many',
        tabsList:[],
        //控制添加属性/参数对话框的显示与隐藏
        dialogVisible:false,
        //控制修改属性/参数对话框的显示与隐藏
        editDialogVisible:false,
        //要修改的属性/参数信息
        editInfo:{}
      }
    },
    created() {
      this.getCateList()
    },
    methods:{
      getCateList(){
        request({url:'categories',method:'get'}).then(res=>{
          this.cateList = res.data
        }).catch(err=>{
          console.log(err)
        })
      },
      cateKeysChange(){
        this.getTabsList()
      },
      handleTabsClick(){
        this.getTabsList()
      },
      //获取对应属性数据
      getTabsList(){
        if(this.parentCateKeys.length !== 3){
          this.parentCateKeys = []
          return
        }
        let cateId = this.cateId
        let active = this.activeName
        request({url:`categories/${cateId}/attributes`,params:{sel:active}}).then(res=>{
          this.tabsList = res.data
        }).catch(err=>{
          console.log(err)
        })
      },
      addTabs(){
        this.dialogVisible = true
      },
      closeAdd(index,able){
        this.dialogVisible = index
        if(able === 'isok'){
          this.getTabsList()
        }
      },
      edit(index,editInfo){
        this.editDialogVisible = index
        this.editInfo = editInfo
        if(!index){
          this.getTabsList()
        }
      },
      deleteCate(index){
        if(index){
          this.getTabsList()
        }

      }
    },
    computed:{
      isDisable(){
        if(this.parentCateKeys.length !== 3){
          return true
        }else{
          return false
        }
      },
      cateId(){
        if(this.parentCateKeys.length === 3){
          return this.parentCateKeys[2]
        }else {
          return null
        }
      }
    }

  }
</script>

<style scoped>
.el-row{
  margin: 15px 0;
}
</style>

