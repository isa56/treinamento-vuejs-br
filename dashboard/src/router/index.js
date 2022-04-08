import { createRouter, createWebHistory } from 'vue-router'

const HomeView = import('../views/Home/index.vue')
const FeedbacksView = import('@/views/Feedbacks/index.vue')
const CredentialsView = import('../views/Credentials/index.vue')


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/feedbacks',
    name: 'feedbacks',
    component: FeedbacksView,
    meta: {
      hasAuth: true
    }
  },
  {
    path: '/credentials',
    name: 'credentials',
    component: CredentialsView,
    meta: {
      hasAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' }
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router