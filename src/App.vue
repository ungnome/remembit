<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import TheReloadPrompt from '@components/TheReloadPrompt.vue';
import { useSettings } from '@store/settings';
import { useUser } from '@store/user';
import { useApp } from '@store/app';
import { useThemeController } from '@composables/themeController';
import { useRouter } from 'vue-router';

// init
const app = useApp();
const user = useUser();
const settings = useSettings();
const themeController = useThemeController();
const router = useRouter();

// init app state
app.init();

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

// if user is already logged in, send to default route
if (user.isLoggedIn) {
  if (app.isMobile) {
    router.push({ name: 'MobileRoot' });
  } else {
    router.push({ name: 'Web' });
  }
}
</script>

<template>
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
