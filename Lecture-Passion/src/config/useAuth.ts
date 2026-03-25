import { myMSALObj } from './msalConfig';

export function useAuth() {
  const login = async () => {
    try {
      if (!myMSALObj) {
        throw new Error('MSAL object is not initialized');
      }
      await myMSALObj.loginRedirect();

      const loginResponse = await myMSALObj.loginRedirect();
      console.log('Login successful:', loginResponse);
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
    }
  };

  const logout = () => {
    if (!myMSALObj) {
      console.error('MSAL object is not initialized');
      return;
    }
    myMSALObj.logoutRedirect();
    console.log('Logout successful');
  };

  const handleRedirect = async () => {
    try {
      await myMSALObj.handleRedirectPromise();
    } catch (error) {
      console.error('Erreur lors du traitement du redirect :', error);
    }
  };
  return { login, logout, handleRedirect };
}
