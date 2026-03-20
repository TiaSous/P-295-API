import { useUserStore } from '@/stores/userStore';
import axios from 'axios';

const clientHttp = axios.create();

clientHttp.interceptors.request.use((config) => {
  const userStore = useUserStore();
  if (userStore.isAuthenticated) {
    config.headers.Authorization = `Bearer ${userStore.token}`;
  }

  return config;
});

clientHttp.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error.response?.status) {
      case 403:
        console.error('Accès interdit');
        break;
      case 404:
        console.error('Ressource non trouvée');
        break;
      case 500:
        console.error('Erreur serveur');
        break;
      default:
        console.error('Erreur inconnue:', error);
        break;
    }

    return Promise.reject(error.response?.data || error.message);
  }
);

export default clientHttp;
