import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'
import Page from '@/views/Page'
import Profile from '@/views/Profile'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: Full,
      children: [
        {
          path: '',
          name: 'Profil',
          component: Dashboard
        },
        {
          path: '/page',
          name: 'InfoUrl',
          component: Page
        },
        {
          path: '/profile',
          name: 'ProfilStats',
          component: Profile
        }

      ]
    }
  ]
})
