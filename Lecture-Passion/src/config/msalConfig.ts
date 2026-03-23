import { PublicClientApplication, RedirectRequest } from '@azure/msal-browser';

export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_MSAL_CLIENT_ID,
    authority: 'https://login.microsoftonline.com/' + import.meta.env.VITE_MSAL_TENANT_ID,
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};

export const graphScopes: RedirectRequest = {
  scopes: ['openid', 'profile', 'User.Read'],
};

export const myMSALObj = new PublicClientApplication(msalConfig);
