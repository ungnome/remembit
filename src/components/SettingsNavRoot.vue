<template>
  <ion-toolbar>
    <ion-title>Settings</ion-title>
    <ion-buttons slot="primary">
      <ion-button fill="clear" @click="close()"> Close </ion-button>
    </ion-buttons>
  </ion-toolbar>
  <ion-content>
    <ion-list inset>
      <ion-item button @click="push()"> Theme</ion-item>
    </ion-list>
  </ion-content>
</template>

<script setup lang="ts">
import {
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonContent,
  IonButton,
  IonButtons,
  modalController
} from '@ionic/vue';
import SettingsNavThemeVue from './SettingsNavTheme.vue';
import { ref } from 'vue';

/* 
Anti-pattern to get ionic IonNav comonent to work. We can't pass props to the "root" component, so we must query for the IonNav component by Id instead.

The nav variable refers to the IonNav component in the SettingsModal.vue component.
*/
const nav = ref();
const navController = document.getElementById('settings-nav')!;
nav.value = navController;

// Navigation control functions
function push() {
  nav.value.push(SettingsNavThemeVue);
}
function close() {
  modalController.dismiss();
}
</script>

<style scoped></style>
