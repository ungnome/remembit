<template>
  <ion-toolbar>
    <ion-title>Theme</ion-title>
    <ion-buttons slot="start">
      <ion-back-button default-href=""></ion-back-button>
    </ion-buttons>
  </ion-toolbar>
  <ion-content>
    <ion-list>
      <ion-radio-group :value="settings.theme" @ion-change="handleThemeChange">
        <ion-item>
          <ion-icon
            class="ion-margin-end theme-icon-size"
            :icon="sunnyOutline"></ion-icon>
          <ion-label>Light</ion-label>
          <ion-radio slot="end" value="light"></ion-radio>
        </ion-item>

        <ion-item>
          <ion-icon class="ion-margin-end theme-icon-size" :icon="moonOutline"></ion-icon>
          <ion-label> Dark </ion-label>
          <ion-radio slot="end" value="dark"></ion-radio>
        </ion-item>

        <ion-item>
          <ion-icon
            class="ion-padding-end theme-icon-size"
            :icon="phonePortraitOutline"></ion-icon>
          <ion-label>
            <ion-text>System</ion-text>
          </ion-label>

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
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonRadio,
  IonRadioGroup,
  IonIcon,
  IonText,
  RadioGroupCustomEvent,
  IonButtons
} from '@ionic/vue';
import { sunnyOutline, moonOutline, phonePortraitOutline } from 'ionicons/icons';
import { useSettings } from '@store/settings';

// load settings store
const settings = useSettings();

function handleThemeChange(event: RadioGroupCustomEvent) {
  settings.theme = event.detail.value;
}
</script>

<style scoped>
.theme-icon-size {
  font-size: 18px;
}
</style>
