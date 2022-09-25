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
    async login(email: string, password: string) {
      const result = await supabase.auth.signIn({ email: email, password: password });
      if (result.user) {
        this.name = 'User Name';
        this.email = result.user.email;
        this.id = result.user.id;
      }

      return result;
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
      // check for existing session
      const user = supabase.auth.user();

      // if there is an existing session, set state accordingly
      if (user) {
        this.isLoggedIn = true;
        this.id = user.id;
        this.email = user.email;
      }
    },

    updatePassword(newPassword: string) {
      return supabase.auth.update({ password: newPassword });
    },

    updateEmail(newEmail: string) {
      return supabase.auth.update({ email: newEmail });
    }
  }
});
