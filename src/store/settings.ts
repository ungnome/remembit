import { defineStore } from 'pinia';

type Settings = {
  theme: 'light' | 'dark' | 'system';
};

const useSettings = defineStore('settings', {
  state: (): Settings => {
    return {
      theme: 'system'
    };
  },

  actions: {
    save() {
      localStorage.setItem('settings', JSON.stringify(this.$state));
    },

    load() {
      const retrievedSettings = localStorage.getItem('settings');

      if (retrievedSettings) {
        this.$state = JSON.parse(retrievedSettings);
      } else {
        this.save();
      }
    }
  }
});

export { useSettings };
