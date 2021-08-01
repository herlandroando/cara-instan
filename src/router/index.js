import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import MarkdownTemplate from '../pages/MarkdownTemplate.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/TentangKami.vue')
  },
  { path: '/tips/:slug', component: MarkdownTemplate , name:'Tips'}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
