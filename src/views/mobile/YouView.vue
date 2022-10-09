<template>
  <ion-page ref="page">
    <ion-header>
      <ion-toolbar>
        <ion-title>You</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>
          <ion-avatar class="profile-image">
            <img
              src="https://raw.githubusercontent.com/ionic-team/ionic-docs/main/static/demos/api/avatar/avatar.svg" />
          </ion-avatar>
          <ion-label class="ion-padding">
            <ion-text><h2>First Last</h2></ion-text>
            <ion-text><p>Some detail text</p></ion-text>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-list>
        <ion-item
          v-for="item in menu"
          :key="item.label"
          :detail="false"
          button
          @click="item.modalController.show()">
          <ion-icon class="ion-margin-end" :icon="item.icon"></ion-icon>
          <ion-label>{{ item.label }}</ion-label>
        </ion-item>
      </ion-list>

      <ion-list lines="none">
        <ion-item id="profile-list-logout" button :detail="false" @click="handleLogout()">
          <ion-label color="danger" class="ion-text-center">Logout</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
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
  IonAvatar,
  IonText
} from '@ionic/vue';
import {
  settingsOutline,
  informationCircleOutline,
  personCircleOutline
} from 'ionicons/icons';
import { useUser } from '@store/user';
import { useRouter } from 'vue-router';
import { useModalControls } from '@composables/modalControls';
import SettingsModal from '@components/mobile/SettingsModal.vue';
import AccountModal from '@components/mobile/AccountModal.vue';
import PlaceholderComponent from '@components/common/PlaceholderComponent.vue';

// Init
const userStore = useUser();
const router = useRouter();
const appElement = document.getElementById('root-router-outlet');
const presentingElement = appElement ? appElement : undefined;

// Page Functions
function handleLogout() {
  userStore.logout().then(() => {
    router.push({ name: 'Login' });
  });
}

// Menu
const menu = [
  {
    label: 'Account',
    icon: personCircleOutline,
    modalController: useModalControls({
      content: AccountModal,
      presentingElement: presentingElement
    })
  },
  {
    label: 'Settings',
    icon: settingsOutline,
    modalController: useModalControls({
      content: SettingsModal,
      presentingElement: presentingElement
    })
  },
  {
    label: 'About',
    icon: informationCircleOutline,
    modalController: useModalControls({
      content: PlaceholderComponent,
      presentingElement: presentingElement
    })
  }
];
</script>

<style scoped></style>
