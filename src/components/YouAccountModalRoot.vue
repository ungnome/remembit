<template>
  <ion-toolbar>
    <ion-title>Account</ion-title>
    <ion-buttons slot="primary">
      <ion-button fill="clear" @click="close()"> Close </ion-button>
    </ion-buttons>
  </ion-toolbar>
  <ion-content>
    <ion-list>
      <!-- <ion-item v-for="item in menu" :key="item.label" button> {{ item.label }}</ion-item> -->
      <ion-nav-link
        v-for="item in menu"
        :key="item.label"
        :component="item.component"
        router-direction="forward">
        <ion-item button> {{ item.label }} </ion-item>
      </ion-nav-link>
    </ion-list>
  </ion-content>
</template>

<script setup lang="ts">
import {
  IonToolbar,
  IonTitle,
  IonList,
  // IonItem,
  IonContent,
  IonButton,
  IonButtons,
  modalController,
  IonNavLink
} from '@ionic/vue';
import YouAccountModalChangePassword from './YouAccountModalChangePassword.vue';

function close() {
  modalController.dismiss();
}

const menu = [
  {
    label: 'Change Password',
    component: YouAccountModalChangePassword
  }
];
</script>

<style scoped></style>
