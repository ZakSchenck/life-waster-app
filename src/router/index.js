import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from "../views/Home.vue"
import Register from "../views/Register.vue"
import Community from "../views/Community.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      name: 'Home',
      meta: {
        refresh: true,
      },
      component: Home,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/community',
      name: 'Community',
      component: Community,
    },
  ],
})

export default router
