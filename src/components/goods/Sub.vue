<template>
  <div>
      <slot name="left">返回</slot>
      <slot name="main">标题</slot>
      <slot name="right">下一步</slot>
  </div>

</template>

<script>
  export default {
    name: "Sub",
    data(){
      return{
        sub:'这是兄弟组件'
      }
    },
    methods:{
      getSub(){
        this.$store.commit('setSub',this.sub)
      }
    }
  }
</script>

<style scoped>

</style>