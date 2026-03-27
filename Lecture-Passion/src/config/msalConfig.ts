import type { RedirectRequest } from '@azure/msal-browser';
import { PublicClientApplication } from '@azure/msal-browser';

export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_MSAL_CLIENT_ID,
    authority: 'https://login.microsoftonline.com/' + import.meta.env.VITE_MSAL_TENANT_ID,
    redirectUri: import.meta.env.VITE_MSAL_REDIRECT_URI,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};

export const graphScopes: RedirectRequest = {
  scopes: ['openid', 'profile', 'email'],
};

export const myMSALObj = new PublicClientApplication(msalConfig);
