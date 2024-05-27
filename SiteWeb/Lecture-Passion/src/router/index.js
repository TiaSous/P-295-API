import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '@/views/Accueil.vue'


// todo lazy loading
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: Accueil
    },
    {
      path: '/liste',
      name: 'liste',
      component: () => import('@/views/Liste.vue')
    },
    {
      path:'/connection',
      name:'connection',
      component: () => import('@/views/Connection.vue')
    },
    {
      path:'/livre/:id',
      name:'livre-details',
      component: () => import('@/views/DetailsLivre.vue'),
      props: true
    },
    {
      path:'/user/:id',
      name:'user',
      component: () => import('@/views/UserPage.vue'),
      props: true
    },
    {
      path:'/livre/add',
      name:'add-livre',
      component: () => import('@/views/AddLivre.vue'),
    },
    {
      path:'/categorie/:id/livre',
      name:'livre-categorie',
      component: () => import('@/views/ListeLivreCategorie.vue'),
      props: true
    }
  ]
})

export default router
