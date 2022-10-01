<template>
  <ion-toolbar>
    <ion-title>Edit Bookmark</ion-title>
    <ion-buttons slot="primary">
      <ion-button type="submit" fill="clear" color="primary" @click="save()">
        Save
      </ion-button>
    </ion-buttons>
    <ion-buttons slot="secondary">
      <ion-button fill="clear" color="danger" @click="close()"> Cancel </ion-button>
    </ion-buttons>
  </ion-toolbar>

  <ion-content class="ion-padding">
    <BookmarkForm
      ref="bookmarkForm"
      form-type="edit"
      :bookmark-id="props.bookmarkId"
      @success="close()" />
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
import { ref, defineProps } from 'vue';
import BookmarkForm from './BookmarkForm.vue';

const props = defineProps({
  bookmarkId: {
    type: String,
    required: true
  }
});

const bookmarkForm = ref();

function close() {
  modalController.dismiss();
}

function save() {
  bookmarkForm.value.submit();
}
</script>

<style scoped></style>
