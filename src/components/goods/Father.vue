<template>
  <div>
    <Sub>
      <div slot="left">左边</div>
      <div slot="main">main</div>
      <div slot="right">next</div>
    </Sub>
  </div>

</template>

<script>
  import Son from "./Son";
  import Sub from "./Sub";
  export default {
    name: "Father",
    data(){
      return {
        father:'我是父组件的内容',
        son:''
      }
    },
    components: {Sub, Son},
    methods:{
      getSon(son){
        this.son = son
      }
    }
  }
</script>

<style scoped>
div{
  display: flex;
}
</style>