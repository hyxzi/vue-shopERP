<template>
  <el-dialog
    :title="'修改' + getTitle"
    :visible.sync="editDialogVisible"
    width="30%"
    :before-close="closeEdit">
    <el-form :model="editInfo" :rules="ruleForm" ref="loginFormRef" label-width="100px">
      <el-form-item :label="getTitle" prop="attr_name">
        <el-input v-model="editInfo.attr_name">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="closeEdit">取 消</el-button>
    <el-button type="primary" @click="editList">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  import {request} from "../../request";

  export default {
    name: "EditDialog",
    props:{
      activeName:{
        type: String
      },
      editDialogVisible:{
        type: Boolean
      },
      editInfo:{}
    },
    data(){
      return {
        ruleForm:{
          attr_name:[{required: true, message: '内容不能为空', trigger: 'blur'}]
        }
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
    },
    methods:{
      //取消编辑
      closeEdit(){
        this.$emit('closeEdit',false)
      },
      //完成编辑，发送网络请求
      editList(){
        //
        this.$refs.loginFormRef.validate(value => {
          if (!value) {
            return
          }
          let editInfo = this.editInfo
          request({
            url: `categories/${editInfo.cat_id}/attributes/${editInfo.attr_id}`, data: editInfo, method: 'put'
          }).then(res => {
            if (res.meta.status === 200) {
              this.$message.success('编辑成功')
              this.$emit('edit', false,res.data)
            } else {
              this.$message.error(`${res.meta.msg}`)
            }
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>