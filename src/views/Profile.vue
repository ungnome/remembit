<template>
  <ion-page id="page-profile" ref="pageRef">
    <ion-header id="page-profile-header">
      <ion-toolbar id="page-profile-toolbar">
        <ion-title>You</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content id="page-profile-content">
      <ion-list id="profile-list">
        <ion-item button @click="accountModal.toggle()">
          <ion-avatar class="profile-image">
            <img
              src="https://raw.githubusercontent.com/ionic-team/ionic-docs/main/static/demos/api/avatar/avatar.svg" />
          </ion-avatar>
          <ion-label class="ion-padding">
            <ion-text><h2>Colin Arndt</h2></ion-text>
            <ion-text><p>Some detail text</p></ion-text>
          </ion-label>
        </ion-item>
      </ion-list>
      <ion-list id="misc-list">
        <ion-item id="profile-list-settings" button @click="settingsModal.toggle()">
          <ion-icon class="ion-margin-end" :icon="settingsOutline"></ion-icon>
          <ion-label>Settings</ion-label>
        </ion-item>
        <ion-item id="profile-list-logout" button @click="aboutModal.toggle()">
          <ion-icon class="ion-margin-end" :icon="informationCircleOutline"></ion-icon>
          <ion-label>About</ion-label>
        </ion-item>
      </ion-list>

      <ion-list lines="none">
        <ion-item id="profile-list-logout" button :detail="false" @click="handleLogout()">
          <ion-label color="danger" class="ion-text-center">Logout</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>

    <ion-modal
      id="settings-modal"
      :presenting-element="presentingElement"
      :swipe-to-close="true"
      :is-open="settingsModal.isOpen.value"
      :initial-breakpoint="settingsModal.initialBreakPoint"
      @will-dismiss="settingsModal.toggle()">
      <SettingsModal />
    </ion-modal>

    <ion-modal
      id="about-modal"
      :presenting-element="presentingElement"
      :swipe-to-close="true"
      :is-open="aboutModal.isOpen.value"
      :initial-breakpoint="aboutModal.initialBreakPoint"
      @will-dismiss="aboutModal.toggle()">
      <PlaceholderVue />
    </ion-modal>

    <ion-modal
      id="account-modal"
      :presenting-element="presentingElement"
      :swipe-to-close="true"
      :is-open="accountModal.isOpen.value"
      :initial-breakpoint="accountModal.initialBreakPoint"
      @will-dismiss="accountModal.toggle()">
      <PlaceholderVue />
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
  IonModal,
  IonAvatar,
  IonText
} from '@ionic/vue';
import { settingsOutline, informationCircleOutline } from 'ionicons/icons';
import { useUser } from '../store/user';
import { useRouter } from 'vue-router';
import { useModalControls } from '../composables/modalControls';
import SettingsModal from '../components/SettingsModal.vue';
import PlaceholderVue from '../components/Placeholder.vue';

// Init
const userStore = useUser();
const router = useRouter();
const presentingElement = document.getElementById('page-profile')!;

// Modals
const settingsModal = useModalControls(0.98, []);
const aboutModal = useModalControls(0.98, []);
const accountModal = useModalControls(0.98, []);

// Page Functions
function handleLogout() {
  userStore.logout().then(() => {
    router.push({ name: 'Login' });
  });
}
</script>

<style scoped></style>
