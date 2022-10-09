<template>
  <ion-page id="login-page">
    <div class="login-card-container">
      <ion-card class="login-card">
        <ion-card-header>
          <ion-card-title>Log in</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <VeeForm
            id="login-form"
            ref="loginForm"
            :validation-schema="formValidationSchema"
            @submit="handleSubmit">
            <ion-item id="email-container">
              <ion-label id="email-label" position="floating">Email</ion-label>
              <VeeField
                id="email"
                v-model="email"
                :as="IonInput"
                name="email"
                form="login-form"
                inputmode="email"
                placeholder="Email Address"
                autocomplete="email"
                :validate-on-change="false"
                :validate-on-blur="false"
                :validate-on-model-update="false">
              </VeeField>
            </ion-item>
            <VeeError v-slot="{ message }" name="email">
              <ion-text color="danger">{{ message }}</ion-text>
            </VeeError>
            <ion-item>
              <ion-label id="password-label" position="floating">Password</ion-label>
              <VeeField
                id="password"
                v-model="password"
                :as="IonInput"
                name="password"
                form="login-form"
                inputmode="text"
                placeholder="Password"
                type="password"
                autocomplete="current-password"
                :validate-on-change="noValidate"
                :validate-on-blur="noValidate"
                :validate-on-model-update="noValidate">
              </VeeField>
            </ion-item>
            <VeeError v-slot="{ message }" name="password">
              <ion-text color="danger">{{ message }}</ion-text>
            </VeeError>
            <ion-button
              class="ion-margin-top ion-text-capitalize"
              expand="block"
              type="submit">
              Submit
            </ion-button>
          </VeeForm>
          <ion-button
            v-if="showRegister()"
            class="ion-margin-top ion-text-capitalize"
            expand="block"
            @click="handleRegister()">
            Register
          </ion-button>
        </ion-card-content>
      </ion-card>
      <ion-loading
        id="submitting-indicator"
        :is-open="isLoading"
        message="Logging in..."></ion-loading>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
// imports
import {
  IonPage,
  IonInput,
  IonItem,
  IonLabel,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonText,
  IonLoading
} from '@ionic/vue';
import { ref } from 'vue';
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeError
} from 'vee-validate';
import { object, string } from 'yup';
import { useUser } from '@store/user';
import { useApp } from '@store/app';
import { useRouter } from 'vue-router';
import { useToast } from '@composables/toast';
const supabaseUrl = import.meta.env.REMEMBIT_SUPABASE_URL as string;

// init
const app = useApp();
const user = useUser();
const router = useRouter();
const isLoading = ref(false);
const loginForm = ref<InstanceType<typeof HTMLFormElement>>();
const toast = useToast();

// form data and validation
const email = ref('');
const password = ref('');
const formValidationSchema = object({
  email: string().required().email(),
  password: string().required()
});
const noValidate = false;

// functions
async function handleSubmit() {
  toggleIsLoading();
  const { session, error } = await user.login(email.value, password.value);

  if (session) {
    toggleIsLoading();
    if (app.isMobile) {
      router.push({ name: 'MobileRoot' });
    } else {
      router.push({ name: 'Web' });
    }
  }

  if (error) {
    toggleIsLoading();
    const message = `${supabaseUrl}`;
    toast.show(message, 'error');
  }
}

function toggleIsLoading() {
  isLoading.value = !isLoading.value;
}

function showRegister() {
  const mode = import.meta.env.MODE;
  return mode === 'production' ? false : true;
}

function handleRegister() {
  user.register(email.value, password.value);
}
</script>

<style scoped>
.login-card {
  flex: 450px 0 1;
  border-style: solid;
  border-color: lightgrey;
  border-width: 1px;
}

.login-card-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.debug1 {
  border: solid;
  color: red;
}
</style>
