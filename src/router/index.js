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
      path: '/perInfo',
      name:'PerInfo',
      component: () => import('../views/user/PerInfo.vue')
    },
    {
      path: '/changeInfo',
      name:'ChangeInfo',
      component: () => import('../views/user/ChangeInfo.vue')
    },
    {
      path: '/test',
      name: 'Test',
      component: () => import('../views/test.vue')
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/homePage.vue')
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
    },
    {
      path: '/scholarPage',
      name: 'ScholarPage',
      component: () => import('../views/scholar/ScholarPage')
    },
    {
      path:'/admin',
      name:'admin',
      component: () => import('../views/admin/admin')
    }
]

const router = new VueRouter({
  routes
})

export default router
