import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    // 动态路径参数 以冒号开头
    { path: '/home', component: () => import('../views/home.vue') },
    { path: '/my', component: () => import('../views/my.vue') },
    { path: '/about', component: () => import('../views/about.vue') },
  ],
})
export default router
