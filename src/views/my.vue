<template>
  <div class="my">
    <span @click="dealrRouterFn">my</span>
  </div>
</template>

<script  lang="ts">
import {useRouter,useRoute} from 'vue-router'
export default {
 name: 'my',
 setup(props,ctx){
   const router = useRouter()
   const dealrRouterFn = ()=>{
     console.log(router.getRoutes());
   }
   return {dealrRouterFn}
 }
}
</script>

<style scoped>

</style>
