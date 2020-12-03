<template>
  <el-container>
    <!--头部导航-->
    <el-header>
      <div>
        <span>泰兴超市后台管理系统</span>
      </div>
      <el-button @click="logout" type="info">退出</el-button>
    </el-header>
    <el-container>
      <!--左边侧边栏导航-->
      <el-aside width="200px">
        <!--菜单栏-->
        <el-menu
          unique-opened
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          router
          :default-active="nowRouter"
        >
          <el-submenu :index="item.id+''" v-for="item in menusList" :key="item.id">
            <!--一级菜单-->
            <template slot="title">
              <i :class="iconList[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!--二级菜单-->
            <el-menu-item :index="'/'+subitem.path" v-for="subitem in item.children" :key="subitem.id" @click="saveRouter('/'+subitem.path)">
              <i class="el-icon-menu"></i>
              <template slot="title" >{{subitem.authName}}</template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--主菜单-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  // @ is an alias to /src
  import {request} from "../request";

  export default {
    name: 'Home',
    components: {},
    data() {
      return {
        menusList: [],
        iconList: {
          '125': 'iconfont icon-yonghuguanli',
          '103': 'iconfont icon-tijikongjian',
          '101': 'iconfont icon-shangpin',
          '102': 'iconfont icon-danju-tianchong',
          '145': 'iconfont icon-baobiao',
        },
        nowRouter:''
      }
    },
    created() {
      this.getMenusList()
      this.nowRouter = sessionStorage.getItem('nowRouter')
    },
    methods: {
      //退出登录
      logout() {
        sessionStorage.clear()
        this.$router.push('/login')
      },
      //获取导航数据
      getMenusList() {
        return request('menus').then(res => {
          if (res.meta.status !== 200) {
            this.$message.error('获取数据失败，请刷新页面重新获取数据')
          }
          this.menusList = res.data
        }).catch(err => {
          console.log(err)
        })
      },
      //保存当前路由信息
      saveRouter(router){
        sessionStorage.setItem('nowRouter', router)
        const nowRouter = sessionStorage.getItem('nowRouter')
        this.nowRouter = nowRouter
      }
    }
  }
</script>
<style lang="less" scoped>
  .el-container {
    height: 100%;
  }

  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 15px;
    align-items: center;
    color: #fff;
    font-size: 20px;

    > div {
      display: flex;
      align-items: center;
    }
  }

  .el-aside {
    background-color: #333744;

    .el-menu {
      border-right: 0;

      .iconfont {
        margin-right: 10px;
      }
    }
  }

  .el-main {
    background-color: #eaedf1;
  }
</style>
