<template>
  <ion-toolbar>
    <ion-button slot="primary" fill="clear" color="primary" @click="close()">
      Close
    </ion-button>
    <ion-title>Settings</ion-title>
  </ion-toolbar>
  <ion-content>
    <ion-list inset>
      <ion-radio-group :value="settings.theme" @ion-change="handleThemeChange">
        <ion-list-header>Theme</ion-list-header>
        <ion-item>
          <ion-icon class="ion-margin-end" :icon="sunnyOutline"></ion-icon>
          <ion-label>Light</ion-label>
          <ion-radio slot="end" value="light"></ion-radio>
        </ion-item>

        <ion-item>
          <ion-icon class="ion-margin-end" :icon="moonOutline"></ion-icon>
          <ion-label>Dark</ion-label>
          <ion-radio slot="end" value="dark"></ion-radio>
        </ion-item>

        <ion-item>
          <ion-icon class="ion-margin-end" :icon="phonePortraitOutline"></ion-icon>
          <ion-label>System</ion-label>
          <ion-radio slot="end" value="system"></ion-radio>
        </ion-item>
      </ion-radio-group>
    </ion-list>
  </ion-content>
</template>

<script setup lang="ts">
import {
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonRadio,
  IonRadioGroup,
  IonIcon,
  RadioGroupCustomEvent
} from '@ionic/vue';
import { sunnyOutline, moonOutline, phonePortraitOutline } from 'ionicons/icons';
import { modalController } from '@ionic/vue';
import { useSettings } from '../store/settings';

// load settings store
const settings = useSettings();

function handleThemeChange(event: RadioGroupCustomEvent) {
  settings.theme = event.detail.value;
}

function close() {
  modalController.dismiss();
}
</script>

<style scoped></style>
