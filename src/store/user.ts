import { defineStore } from 'pinia';
import { supabase } from '../services/supabase';

type UserState = {
  isLoggedIn: boolean;
  name: string | undefined;
  email: string | undefined;
  id: string | undefined;
};

// store
export const useUser = defineStore('user', {
  state: (): UserState => {
    return {
      isLoggedIn: false,
      name: undefined,
      email: undefined,
      id: undefined
    };
  },
  actions: {
    login(email: string, password: string) {
      return supabase.auth.signIn({ email: email, password: password });
    },

    logout() {
      return supabase.auth.signOut();
    },

    register(email: string, password: string) {
      supabase.auth.signUp({ email: email, password: password }).then(() => {
        this.refresh();
      });
    },

    refresh() {
      const user = supabase.auth.user();

      if (user) {
        this.isLoggedIn = true;
        this.id = user.id;
        this.email = user.email;
      }
    }
  }
});
