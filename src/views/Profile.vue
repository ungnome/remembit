<template>
  <ion-page id="page-profile">
    <ion-header id="page-profile-header">
      <ion-toolbar id="page-profile-toolbar">
        <ion-title>You</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content id="page-profile-content">
      <ion-list id="profile-list">
        <ion-item id="profile-list-settings" button @click="settingsModal.toggle()">
          <ion-icon class="ion-margin-end" :icon="settingsOutline"></ion-icon>
          <ion-label>Settings</ion-label>
        </ion-item>
        <ion-item id="profile-list-logout" button @click="handleLogout()">
          <ion-icon class="ion-margin-end" :icon="logOutOutline"></ion-icon>
          <ion-label>Logout</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>

    <ion-modal
      :is-open="settingsModal.isOpen.value"
      :initial-breakpoint="settingsModal.initialBreakPoint"
      @will-dismiss="settingsModal.toggle()">
      <SettingsModal />
    </ion-modal>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonLabel,
  IonIcon,
  IonToolbar,
  IonTitle,
  IonHeader,
  IonItem,
  IonList,
  IonModal
} from '@ionic/vue';
import { logOutOutline, settingsOutline } from 'ionicons/icons';
import { useUserStore } from '../store/user';
import { useRouter } from 'vue-router';
import { useModalControls } from '../composables/modalControls';
import SettingsModal from '../components/SettingsModal.vue';

// Init
const userStore = useUserStore();
const router = useRouter();

// Settings Modal
const settingsModal = useModalControls(0.98, []);

// Page Functions
function handleLogout() {
  userStore.logoutUser().then(() => {
    router.push({ name: 'Login' });
  });
}
</script>

<style scoped></style>
