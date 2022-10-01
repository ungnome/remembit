<template>
  <vee-form :validation-schema="formSchema" @submit="handleSubmit">
    <ion-item>
      <ion-label position="floating">Current Password</ion-label>
      <vee-field
        name="currentPassword"
        type="password"
        placeholder="Current Password"
        :as="IonInput"></vee-field>
    </ion-item>
    <vee-error v-slot="{ message }" name="currentPassword">
      <ion-text color="danger">
        <small>{{ message }}</small>
      </ion-text>
    </vee-error>

    <ion-item>
      <ion-label position="floating"> New Password </ion-label>
      <vee-field
        name="newPassword"
        type="password"
        placeholder="New Password"
        :as="IonInput">
      </vee-field>
    </ion-item>
    <vee-error v-slot="{ message }" name="newPassword">
      <ion-text color="danger">
        <small>{{ message }}</small>
      </ion-text>
    </vee-error>

    <ion-item>
      <ion-label position="floating"> Confirm New Password </ion-label>
      <vee-field
        name="confirmPassword"
        type="password"
        placeholder="Confirm New Password"
        :as="IonInput">
      </vee-field>
    </ion-item>
    <vee-error v-slot="{ message }" name="confirmPassword">
      <ion-text color="danger">
        <small>{{ message }}</small>
      </ion-text>
    </vee-error>

    <!-- invisible button to trigger submit -->
    <button v-show="false" ref="submitButton" type="submit">Submit</button>
  </vee-form>
</template>

<script setup lang="ts">
import { IonLabel, IonInput, IonItem, IonText } from '@ionic/vue';
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeError
} from 'vee-validate';
import { string as yupString, object as yupObject, ref as yupRef } from 'yup';
import { ref, defineExpose, defineEmits } from 'vue';
import { useUser } from '../store/user';
import { useToast } from '../composables/toast';

// load user store
const userStore = useUser();
const toast = useToast();

// submit button ref
const submitButton = ref();

// form validation schema
const formSchema = yupObject({
  currentPassword: yupString().required('required'),
  newPassword: yupString().required('required').min(8, 'must be at least 8 characters'),
  confirmPassword: yupString()
    .required('required')
    .oneOf([yupRef('newPassword')], 'must match New Password')
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubmit(values: any) {
  const { user, error } = await userStore.updatePassword(values.newPassword);
  if (user) {
    emit('success');
  }

  if (error) {
    toast.show(error.message, 'error');
  }
}

function submit() {
  submitButton.value.click();
}

// emits and exposed methods
defineExpose({ submit });
const emit = defineEmits(['success']);
</script>

<style scoped></style>
