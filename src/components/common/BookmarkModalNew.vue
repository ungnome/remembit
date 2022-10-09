<template>
  <ion-toolbar>
    <ion-title>New Bookmark</ion-title>
    <ion-buttons slot="primary">
      <ion-button type="submit" fill="clear" color="primary" @click="save()">
        Save
      </ion-button>
    </ion-buttons>
    <ion-buttons slot="secondary">
      <ion-button fill="clear" color="danger" @click="close()"> Cancel </ion-button>
    </ion-buttons>
  </ion-toolbar>

  <ion-content>
    <BookmarkForm ref="bookmarkForm" form-type="new" @success="close()" />
  </ion-content>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonButton,
  IonButtons,
  modalController,
  IonTitle,
  IonToolbar
} from '@ionic/vue';
import { ref } from 'vue';
import BookmarkForm from './BookmarkForm.vue';

const bookmarkForm = ref();

function close() {
  modalController.dismiss();
}

function save() {
  bookmarkForm.value.submit();
}
</script>

<style scoped></style>
