<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import TheReloadPrompt from './components/TheReloadPrompt.vue';
import { useSettings } from './store/settings';
import { useThemeController } from './composables/themeController';

// load the user store
const settings = useSettings();

// init theme controller
const themeController = useThemeController();

// load app settings
settings.load();

// apply app theme
themeController.updateTheme();

// listen for changes to settings
settings.$subscribe(() => {
  // save new settings
  settings.save();

  themeController.updateTheme();
});
</script>

<template>
  k
  <ion-app>
    <ion-router-outlet />
  </ion-app>
  <the-reload-prompt></the-reload-prompt>
</template>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
