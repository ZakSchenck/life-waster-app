import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'store',
  state: () => ({
    username: '',
    isLoggedIn: false,
  }),
  getters: {
    getUsername() {
        return this.username
    },
    getIsLoggedIn() {
        return this.isLoggedIn
    }
  },
  actions: {
    setUsername(name) {
        return this.username = name;
    },
    setIsLoggedIn(logged) {
        return this.isLoggedIn = logged;
    }
  },
});