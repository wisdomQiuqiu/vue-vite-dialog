<template>
  <div class="my">
    <span @click="dealrRouterFn">my</span>
  </div>
</template>

<script>
import {useRouter,useRoute} from 'vue-router'
export default {
 name: 'my',
 setup(props,ctx){
   const router = useRouter(window.location.pathname)
   const dealrRouterFn = ()=>{
     console.log(router.getRoutes());
   }
   return {dealrRouterFn}
 }
}
</script>

<style scoped>

</style>
