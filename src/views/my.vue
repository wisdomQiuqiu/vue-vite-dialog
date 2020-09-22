<template>
  <div class="my">
    <span @click="dealrRouterFn">my</span>
    <div id="content"></div>
    <div is="button-hello">123</div>
  </div>
</template>

<script  lang="ts"  type="module">
import {useRouter,useRoute} from 'vue-router'
export default {
 name: 'my',
 setup(props,ctx){
   const router = useRouter()
   const dealrRouterFn = ()=>{
     console.log(router.getRoutes());
   }
    //customElements.define(name, constructor, options);
    class buttonHello extends HTMLDivElement {
      //constructor 创建或升级元素的一个实例
      //用于初始化状态，设置事件
      constructor() {
        super();
        this.innerText = 'hello'
        let count = 0
        this.addEventListener("mouseover", () => {
          count++
          this.setAttribute('data-val', String(count) )
          console.log('mouseover');
          
        });
        this.addEventListener("click", () => {
           this.style.color = "red";
          this.remove()
          setTimeout(()=>{
            document.getElementById('content').appendChild(this)
          },3000)
        });
      }
      //元素每次插入到 DOM 时都会调用。可用于获取资源或渲染。
      connectedCallback(){
        console.log('connectedCallback');
      }
      //元素每次从 DOM 中移除时都会调用。用于运行清理代码
      disconnectedCallback(){
        console.log('DOM被移除！');
      }
      //属性添加、移除、更新或替换。仅对 observedAttributes 中返回的属性有效。
      attributeChangedCallback(attr, oldVal, newVal){
        console.log('attributeChangedCallback:' + attr);
      }
      //自定义元素被移入新的 document 时调用
      adoptedCallback(){
        console.log('DOM转移');
      } 
    }
    customElements.define("button-hello", buttonHello, {
      extends: "div"
    })
   return {dealrRouterFn}
 }
}
</script>

<style scoped>

</style>
