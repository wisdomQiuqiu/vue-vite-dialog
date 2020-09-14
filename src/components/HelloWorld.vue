<template>
  <button type="primary" class="el-button el-button--primary"  @click="dialogVisible = true">打开弹窗</button>
  <elDialog
    v-model.modelValue="dialogVisible" 
    title="提示"
    width="30vw"
    @close="handleClose">
    <p>这是一段信息～～～</p>
    <div slot="footer" class="dialog-footer">
      <button @click="handleClose" class="el-button el-button--default">取 消</button>
      <button type="primary" class="el-button el-button--primary" @click="dialogVisible = false">确 定</button>
    </div>
  </elDialog>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup(){
    const color = ref('#999')
    const dialogVisible = ref(false)
    const handleClose = ()=>{
      dialogVisible.value = false
    }
    return {color,dialogVisible,handleClose}
  }
}
</script>
<style lang="scss" scoped vars="{ color }">
h1{
  color:var(--color)
}
</style>