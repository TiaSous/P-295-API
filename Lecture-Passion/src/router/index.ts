import { createRouter, createWebHistory } from 'vue-router';
import Accueil from '@/views/Accueil.vue';
import DetailsLivre from '@/views/DetailsLivre.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: Accueil,
    },
    {
      path: '/livre/:id',
      name: 'livre-details',
      component: DetailsLivre,
      props: true,
    },
  ],
});

export default router;
