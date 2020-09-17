<template>
  <demo/>
  <!-- <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->
  <router-link to="/my" custom v-slot="{ href, navigate }">
    <div :href="href" @click="navigate">{{ href }}</div>
  </router-link>
  <!-- <router-link to="/home" custom v-slot="{ href, navigate,route,isActive,isExactActive }">
    <div :href="href" @click="navigate">
      <div>{{ href }}</div>
      <div>{{route}}</div>
      <div>{{isActive}}</div>
      <div>{{isExactActive}}</div>
    </div>
  </router-link> -->
  <!-- 
    custom属性：自定义router-link渲染的内容
    v-slot提供的值：(当选中about路由)
      1. href:'#/about'
      2. navigate:
       function navigate(e = {}) { 
          if (guardEvent(e)) 
            return router[unref(props.replace) 
                ? 'replace' : 'push'](unref(props.to)); 
          return Promise.resolve(); 
        }
      3. route:
        {
          "fullPath": "/about",
          "path": "/about",
          "query": {},
          "hash": "",
          "params": {},
          "matched": [
            {
              "path": "/about",
              "meta": {},
              "props": {
                "default": false
              },
              "children": [],
              "instances": {},
              "leaveGuards": [],
              "updateGuards": [],
              "enterCallbacks": {},
              "components": {
                ...
              }
            }
          ],
          "meta": {},
          "href": "#/about"
        }
      4. isActive true，路由被激活类名"router-link-active"
      （可以由exact属性改变）
      5. isExactActive true，
      路由被激活类名"router-link-exact-active"（可以由exact属性改变）
   -->
  <router-link to="/about" custom v-slot="{ href, navigate,route,isActive,isExactActive }">
    <div :href="href" @click="navigate">
      <!-- <div>{{ navigate }}</div> -->
      <div>{{ href }}</div>
      <!-- <div>{{route}}</div>
      <div>{{isActive}}</div>
      <div>{{isExactActive}}</div> -->
    </div>
  </router-link>
  <router-view></router-view>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import demo from './components/demo.vue'
export default {
  name: 'App',
  components: {
    HelloWorld,
    demo
  },
  setup(){
   
  }
}
</script>
