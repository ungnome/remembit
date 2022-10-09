<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button text="Cancel"></ion-back-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-button @click="submit()">Submit</ion-button>
      </ion-buttons>

      <ion-title>Change Email</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ChangeEmailForm ref="changeEmailForm" />
  </ion-content>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonButtons,
  IonButton,
  IonBackButton
} from '@ionic/vue';
import ChangeEmailForm from '@components/common/ChangeEmailForm.vue';
import { ref } from 'vue';

// form ref
const changeEmailForm = ref();

function submit() {
  changeEmailForm.value.submit();
}
</script>

<style scoped></style>
