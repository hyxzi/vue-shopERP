<template>

</template>

<script>
  export default {
    name: "Son",
    props:{
      son:{
        type:String
      }
    },
    data(){
      return {
        isSon:'我是子组件传来的值'
      }
    },
    methods:{
      getFather(){
        this.$emit('getFather',this.isSon)
      }
    }
  }
</script>

<style scoped>

</style>