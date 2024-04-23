import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '@/views/Accueil.vue'
import Liste from '@/views/Liste.vue'
import Connection from '@/views/Connection.vue'
import DetailsLivre from '@/views/DetailsLivre.vue'
import Inscription from '@/views/Inscription.vue'

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
      component: Liste
    },
    {
      path:'/connection',
      name:'connection',
      component: Connection
    },
    {
      path:'/livre/:id',
      name:'livre-details',
      component: DetailsLivre,
      props: true
    },
    {
      path:'/inscription',
      name:'inscription',
      component: Inscription
    }
  ]
})

export default router