<template>
  <ion-toolbar>
    <ion-title>Placeholder</ion-title>
    <ion-buttons slot="primary">
      <ion-button
        id="button-submit"
        fill="clear"
        color="primary"
        @click="modalController.dismiss()">
        Close
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
  <ion-content class="ion-padding"> Placeholder Page. </ion-content>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonToolbar,
  IonTitle,
  IonButton,
  IonButtons,
  modalController
} from '@ionic/vue';
</script>

<style scoped></style>
