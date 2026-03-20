import { createRouter, createWebHistory } from 'vue-router';
import Accueil from '@/views/Accueil.vue';
import Connection from '@/views/Connection.vue';
import DetailsLivre from '@/views/DetailsLivre.vue';

// todo lazy loading
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: Accueil,
    },
    {
      path: '/connection',
      name: 'connection',
      component: Connection,
    },
    // Dynamic routes come after static routes
    {
      path: '/livre/:id',
      name: 'livre-details',
      component: DetailsLivre,
      props: true,
    },
  ],
});

export default router;
