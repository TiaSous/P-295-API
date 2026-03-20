import { UserApp } from '@/model/bo/userApp';
import { login } from '@/services/api/authService';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null as UserApp | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    logout() {
      this.token = null;
      localStorage.removeItem('token');
      this.user = null;
    },
    async login(username: string, password: string) {
      const result = await login(username, password);
      this.user = result.user;
      this.setToken(result.token);
      alert('vous êtes connecté');
    },
  },
});
