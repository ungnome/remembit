import { defineStore } from 'pinia';
import { Capacitor } from '@capacitor/core';

type App = {
  isMobile: boolean;
};

const useApp = defineStore('app', {
  state: (): App => {
    return {
      isMobile: false
    };
  },

  actions: {
    init() {
      const platform = Capacitor.getPlatform();
      if (platform === 'ios' || platform == 'android') {
        this.isMobile = true;
      }
    }
  }
});

export { useApp };
