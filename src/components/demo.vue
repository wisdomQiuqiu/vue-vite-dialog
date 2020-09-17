
<template>
  <div class="demo" ref="demo">
    <span @click="addCount">{{count}}--{{countObject.count}}</span>
  </div>
</template>

<style scoped>

</style>

<script lang="ts">
import {ref,reactive,readonly,watchEffect,watch, onMounted,toRefs,toRef,customRef} from 'vue'
export default {
  name: 'demo',
  setup(props,{slot,emit,attr}){
    const count = ref(0)
    const countObject = reactive({count:0})
    const countinObject = toRef(countObject,'count')
    const copyCount = readonly(count)
    // copyCount.value++
    watchEffect(() => console.log(count.value),{
      flush: 'pre',
      onTrigger(e) {
        console.log(e)
        // debugger
      },
    })
      //
    //监听单个-1
    watch(
      ()=>countObject.count,
      (newVlaue,oldValue)=>{
        // console.log(`${newVlaue}-${oldValue}`)
      }
    )
    //监听单个-2
    watch(
      countObject,
      (newVlaue,oldValue)=>{
        // console.log(newVlaue)
        // console.log(oldValue)
      }
    )
    // 监听多个
     watch(
      [countObject,count],
      ([newCountObject,newCount],[oldCountObject,oldCount])=>{
        console.log(newCountObject)
        console.log(oldCount)
      }
    )
    const addCount = ()=>{
      count.value++
      countObject.count = countObject.count + 2
    }
    //模版refs
    const demo = ref(null)
    onMounted(()=>{
      console.log(demo.value)
    })
    //与ref相似，但是customRef用于自定义，并且可以跟踪其响应情况
    const useDebouncedRef = (value, delay = 300)=> {
      let timeout
      return customRef((track, trigger) => {
        return {
          get() {
            track()
            return value
          },
          set(newValue) {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
              value = newValue
              trigger()
            }, delay)
          },
        }
      })
    }
    //与 const count  = ref(10)相似，但是customRef可以自定义get和set情况
    const customCount = useDebouncedRef(10)
    return {
      count,
      customCount,
      addCount,
      countObject,
      demo,
    }
  },
}
</script>

<style scoped>

</style>
