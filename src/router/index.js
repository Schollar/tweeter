import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import FeedPage from '@/views/FeedPage.vue'
import PageNotFound from '../views/PageNotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/feed-page',
    name: 'FeedPage',
    component: FeedPage
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: PageNotFound
  },
]

const router = new VueRouter({
  routes
})

export default router
