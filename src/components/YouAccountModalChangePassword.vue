<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button text="Cancel"></ion-back-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-button @click="submit()">Submit</ion-button>
      </ion-buttons>

      <ion-title>Change Password</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <the-change-password-form ref="changePasswordForm"></the-change-password-form>
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
import TheChangePasswordForm from './TheChangePasswordForm.vue';
import { ref } from 'vue';

// form ref
const changePasswordForm = ref();

function submit() {
  changePasswordForm.value.submit();
}
</script>

<style scoped></style>
