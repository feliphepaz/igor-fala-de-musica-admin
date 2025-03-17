import { createRouter, createWebHistory } from 'vue-router'
import useAuth from '@/composables/auth'

import Home from '@/views/Home.vue'
import Dashboard from '@/views/dashboard/index.vue'
import Welcome from '@/views/dashboard/Welcome.vue'
import Posts from '@/views/dashboard/Posts.vue'
import NewPost from '@/views/dashboard/NewPost.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: '/dashboard',
          name: 'welcome',
          component: Welcome,
        },
        {
          path: '/dashboard/posts',
          name: 'posts',
          component: Posts,
        },
        {
          path: '/dashboard/posts/novo-post',
          name: 'novo-post',
          component: NewPost,
        },
      ],
    },
  ],
})

router.beforeEach(async (to, _, next) => {
  const { getSession } = useAuth()

  const session = await getSession()

  if (to.path.includes('/dashboard')) {
    if (session && import.meta.env.VITE_ALLOWED_IDS.includes(session.user.id))
      return next()
    return next('/')
  } else {
    next()
  }
})

export default router
