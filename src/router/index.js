import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name:'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/test',
      name: 'Test',
      component: () => import('../views/test.vue')
    },
    {
      path: '/academicSearch',
      name: 'AcademicSearch',
      component: () => import('../views/academic/AcademicSearch')
    }
]

const router = new VueRouter({
  routes
})

export default router