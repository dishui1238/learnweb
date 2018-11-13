<template>
  <div>
    <h1>APP组件</h1>

    <router-link to="/account">账户</router-link>
    <router-link to="/goodsList">商品</router-link> 
    <mt-button type="primary" @click="show">primary</mt-button>

    <mt-button>123</mt-button>
    <router-view></router-view>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';

  export default{
    data(){
      return{
        toastInstance:null
      }
    },
    created() {
      this.getList()
    },
    methods:{
      getList(){
        this.show();
        setTimeout(()=>{
          this.toastInstance.close()
        },3000)
      },

      show(){
          var toastInstance = Toast({
            message: '操作成功',
            duration: -1,
            position: "bottom",
            iconClass: "glyphicon glyphicon-heart"
          })
        }
      }
  }
</script>

<style>

</style>

