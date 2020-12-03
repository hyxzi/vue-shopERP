<template>
  <ul>
    <!--上一页按钮-->
    <li><button class="el-icon-arrow-left" @click="getPageGo(-1)" :disabled="isActive"></button></li>
    <!--页码数按钮-->
    <li v-for="(item, index) in total" :key="index"><button @click="getPage(index)":class="index==queryInfo.pagenum-1 ? 'active':''">{{index+1}}</button></li>
    <!--下一页按钮-->
    <li><button class="el-icon-arrow-right" :disabled="isEnd" @click="getPageGo(1)"></button></li>

  </ul>
</template>

<script>
  //封装axios函数
  import {request} from "../../request";

  export default {
    name: "page",
    data(){
      return {
        //页面渲染数据
        cateList:[],
        total:0,
        //前端请求参数
        queryInfo: {
          query: '3',
          //访问第几页的页码数
          pagenum: 1,
          //页面展示的数据条数
          pagesize: 5
        }
      }
    },
    mounted() {
      let queryInfo = this.queryInfo
      this.getPageList(queryInfo)
    },
    methods:{
      //点击页码数按钮进行页面跳转
      getPage(index){
        this.queryInfo.pagenum = index+1
        let queryInfo = this.queryInfo
        this.getPageList(queryInfo)
      },
      //根据请求数据与后台交互
      getPageList(queryInfo){
        console.log(queryInfo.pagenum)
        request({url:'categories',params:queryInfo,method:'get'}).then(res=>{
          this.cateList = res.data
          this.total = res.data.total / this.queryInfo.pagesize
          console.log(res)
        }).catch(error=>{
          console.log(error)
        })
      },
      //点击上一页和下一页
      getPageGo(index){
        this.queryInfo.pagenum = this.queryInfo.pagenum + index
        let queryInfo = this.queryInfo
        this.getPageList(queryInfo)
      }
    },
    computed:{
      //当页码数到第一页时，上一页按钮禁用
      isActive(){
        if(this.queryInfo.pagenum > 1){
          return  false
        }else {
          return  true
        }
      },
      //当页码数到最后一页时，下一页按钮禁用
      isEnd(){
        if(this.queryInfo.pagenum === Math.ceil(this.total)){
          return  true
        }else {
          return  false
        }
      }
    }
  }
</script>

<style scoped>
ul{
  height: 50px;
}
  li{
    list-style-type: none;
    font-size: 10px;
    float: left;
    width: 40px;
  }
  .active{
    color: #fff;
    background-color: #2959df;
  }
</style>