import { ref, computed } from 'vue';
import { AccountInfo, InteractionRequiredAuthError } from '@azure/msal-browser';
import { myMSALObj, graphScopes } from './msalConfig';
import { useUserStore } from '@/stores/userStore';

export function useAuth() {
  const userStore = useUserStore();

  const login = async () => {
    try {
      await myMSALObj.loginRedirect(graphScopes);
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
    }
  };

  const logout = () => {
    try {
      myMSALObj.logoutRedirect({
        postLogoutRedirectUri: window.location.origin,
      });
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  const handleRedirect = async () => {
    try {
      const result = await myMSALObj.handleRedirectPromise();
      if (result) {
        // Stocker le token et les infos utilisateur
        userStore.setToken(result.accessToken);
        userStore.setUser({
          id: result.account?.homeAccountId || '',
          username: result.account?.username || '',
          role: 'user',
        });

        console.log('Redirect traité avec succès, données stockées');
      }
    } catch (error) {
      console.error('Erreur lors du traitement du redirect :', error);
    }
  };

  return {
    login,
    logout,
    handleRedirect,
  };
}
