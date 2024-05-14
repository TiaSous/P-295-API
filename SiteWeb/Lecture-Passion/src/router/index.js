import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '@/views/Accueil.vue'
import Liste from '@/views/Liste.vue'
import Connection from '@/views/Connection.vue'
import DetailsLivre from '@/views/DetailsLivre.vue'
import UserPage from '@/views/UserPage.vue'
import AddLivre from '@/views/AddLivre.vue'
import ListeLivreCategorie from '@/views/ListeLivreCategorie.vue'

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
      path:'/user/:id',
      name:'user',
      component: UserPage,
      props: true
    },
    {
      path:'/livre/add',
      name:'add-livre',
      component: AddLivre
    },
    {
      path:'/categorie/:id/livre',
      name:'livre-categorie',
      component: ListeLivreCategorie,
      props: true
    }
  ]
})

export default router
