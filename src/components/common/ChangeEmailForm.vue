<template>
  <vee-form :validation-schema="formSchema" @submit="handleSubmit">
    <ion-item>
      <ion-label position="floating">Current Email</ion-label>
      <vee-field
        name="currentEmail"
        placeholder="Current Email"
        :as="IonInput"></vee-field>
    </ion-item>
    <vee-error v-slot="{ message }" name="currentEmail">
      <ion-text color="danger">
        <small>{{ message }}</small>
      </ion-text>
    </vee-error>

    <ion-item>
      <ion-label position="floating"> New Email </ion-label>
      <vee-field name="newEmail" placeholder="New Email" :as="IonInput"> </vee-field>
    </ion-item>
    <vee-error v-slot="{ message }" name="newEmail">
      <ion-text color="danger">
        <small>{{ message }}</small>
      </ion-text>
    </vee-error>

    <ion-item>
      <ion-label position="floating"> Confirm New Email </ion-label>
      <vee-field name="confirmEmail" placeholder="Confirm New Email" :as="IonInput">
      </vee-field>
    </ion-item>
    <vee-error v-slot="{ message }" name="confirmEmail">
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
import { useUser } from '@store/user';
import { useToast } from '@composables/toast';

// load user store
const userStore = useUser();
const toast = useToast();

// submit button ref
const submitButton = ref();

// form validation schema
const formSchema = yupObject({
  currentEmail: yupString()
    .required('required')
    .oneOf([userStore.email], 'must be your current email email address'),
  newEmail: yupString().email('must be a valid email address').required('required'),
  confirmEmail: yupString()
    .email('must be a valid email address')
    .required('required')
    .oneOf([yupRef('newEmail')], 'must match New Email')
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubmit(values: any) {
  const { user, error } = await userStore.updateEmail(values.newEmail);
  if (user) {
    toast.show('confirmation email sent to your new email address', 'success');
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
