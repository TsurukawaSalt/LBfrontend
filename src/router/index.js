import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name:'Login',
      component: () => import('../views/user/Login.vue')
    },
    {
      path: '/register',
      name:'Register',
      component: () => import('../views/user/Register.vue')
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
    },
    {
      path:'/academicShow',
      name: 'AcademicShow',
      component: () => import('../views/academic/AcademicShow')
    }
]

const router = new VueRouter({
  routes
})

export default router
