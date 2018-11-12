<template>
  <div>
    <h1>登录组件={{msg}}</h1>
  </div>
</template>

<script>
  export default{//注意：组件中的data必须是 function
    data(){
      return{
        msg:'花谢花飞花满天，红消香断有谁怜'
      }
    },
    methods:{
      show(){
        console.log('调用了show方法')
      }
    }
  }
</script>
<style>

</style>
