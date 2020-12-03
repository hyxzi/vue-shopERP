<template>
  <el-dialog
    :title="'添加' + getTitle"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="closeAdd">
    <el-form :model="addInfo" :rules="ruleForm" ref="loginFormRef" label-width="100px">
      <el-form-item :label="getTitle" prop="attr_name">
        <el-input type="text" v-model="addInfo.attr_name">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="closeAdd">取 消</el-button>
    <el-button type="primary" @click="addList">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  import {request} from "../../request";

  export default {
    name: "AddDialog",
    props:{
      dialogVisible:{
        type:Boolean,
      },
      activeName:{
          type: String
      },
      parentCateKeys:{
        type:Array
      }
    },
    data(){
      return {
        ruleForm:{
          attr_name:[{required: true, message: '请输入内容', trigger: 'blur'}]},
        addInfo:{
          attr_name:'',
          attr_sel:'',
          attr_vals:''
        }
      }
    },
    methods:{
      closeAdd(){
        this.$emit('closeAdd',false)
        this.$refs.loginFormRef.resetFields()
      },
      addList(){
        let id = this.parentCateKeys[this.parentCateKeys.length -1]
        this.addInfo.attr_sel = this.activeName
        let addInfo = this.addInfo
        request({url:`categories/${id}/attributes`,data:addInfo,method:'post'}).then(res=>{
         if(res.meta.status === 201){
           this.$message.success("添加成功")
           this.$emit('closeAdd',false,'isok')
         }else {
           this.$message.error(`${res.meta.msg}`)
         }
        }).catch(err=>{
          console.log(err)
        })

        this.$refs.loginFormRef.resetFields()
      }
    },
    computed:{
      getTitle(){
        if(this.activeName === 'many'){
          return '动态参数'
        }else {
          return '静态属性'
        }
      }
    }
  }
</script>

<style scoped>

</style>