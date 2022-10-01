<template>
  <ion-item>
    <ion-label position="floating">Name</ion-label>
    <ion-input v-model="bookmarkName.value.value" placeholder="Name" v></ion-input>
    <span>
      <ion-text class="error-text" color="danger">{{
        bookmarkName.errorMessage.value
      }}</ion-text>
    </span>
  </ion-item>

  <ion-item>
    <ion-label position="floating">Url</ion-label>
    <ion-input v-model="bookmarkUrl.value.value" placeholder="Bookmark Url"></ion-input>
    <span>
      <ion-text class="error-text" color="danger">{{
        bookmarkUrl.errorMessage.value
      }}</ion-text>
    </span>
  </ion-item>

  <ion-item>
    <ion-label position="floating">Tags</ion-label>
    <ion-input
      v-model.trim="bookmarkTag.value.value"
      placeholder="Add Tag"
      @keyup.enter="pushTag()"></ion-input>
    <span>
      <ion-text class="error-text" color="danger">{{
        bookmarkTag.errorMessage.value
      }}</ion-text>
    </span>
  </ion-item>

  <ion-item lines="none">
    <ion-chip
      v-for="(tag, tagIndex) in bookmarkTags"
      id="tag"
      :key="tagIndex"
      color="primary">
      <ion-label id="tag-chip-label">{{ tag }}</ion-label>
      <ion-icon
        id="tag-chip-icon"
        :icon="closeCircleOutline"
        @click.stop="removeTag(tagIndex)"></ion-icon>
    </ion-chip>
  </ion-item>
</template>

<script setup lang="ts">
import { IonInput, IonItem, IonLabel, IonChip, IonIcon, IonText } from '@ionic/vue';
import { closeCircleOutline } from 'ionicons/icons';
import { useField } from 'vee-validate';
import { string as yupString } from 'yup';
import { defineProps, defineExpose, defineEmits, ref } from 'vue';
import { useBookmarks, Bookmark } from '../store/bookmarks';

// functions
function getBookmarkToEdit() {
  if (props.formType === 'edit') {
    return bookmarkStore.bookmarks.find((el) => {
      bookmarkName.setValue(el.name);
      bookmarkUrl.setValue(el.url);
      bookmarkTags.value = el.tags;

      return el.id === props.bookmarkId ? true : false;
    });
  } else {
    return undefined;
  }
}

async function submit() {
  const isValid = await validateForm();

  if (isValid) {
    const bookmark: Bookmark = {
      name: bookmarkName.value.value,
      url: bookmarkUrl.value.value,
      tags: bookmarkTags.value
    };

    switch (props.formType) {
      case 'new':
        await bookmarkStore.createBookmark(bookmark);
        bookmarkStore.fetchBookmarks();
        emit('success');
        break;
      case 'edit':
        if (bookmarkToEdit) {
          bookmarkToEdit.name = bookmarkName.value.value;
          bookmarkToEdit.url = bookmarkUrl.value.value;
          bookmarkToEdit.tags = bookmarkTags.value;

          await bookmarkStore.updateBookmark(bookmarkToEdit);
          bookmarkStore.fetchBookmarks();
          emit('success');
        }
        break;
    }
  }
}

async function validateForm() {
  const validName = (await bookmarkName.validate()).valid;
  const validUrl = (await bookmarkUrl.validate()).valid;

  return validName && validUrl ? true : false;
}

async function pushTag() {
  if (bookmarkTag.value.value) {
    const isValid = (await bookmarkTag.validate()).valid;
    const existsInTags = bookmarkTags.value.includes(bookmarkTag.value.value);
    if (isValid && !existsInTags) {
      bookmarkTags.value.push(bookmarkTag.value.value);
      bookmarkTag.resetField();
    }
  }
}

function removeTag(tagIndex: number) {
  bookmarkTags.value.splice(tagIndex, 1);
}

// component props
const props = defineProps({
  formType: {
    type: String,
    required: true,
    validator: function (value: string) {
      return ['new', 'edit'].includes(value);
    }
  },
  bookmarkId: {
    type: String,
    required: false,
    default: undefined
  }
});

// load bookmark store
const bookmarkStore = useBookmarks();

// form validation
const bookmarkName = useField<string>('name', yupString().required());
const bookmarkUrl = useField<string>('url', yupString().url().required());
const bookmarkTag = useField<string | undefined>('tag', yupString().min(1), {
  validateOnValueUpdate: false
});
const bookmarkTags = ref<string[]>([]);

// get bookmark to edit
const bookmarkToEdit = getBookmarkToEdit();

// emits and exposed methods
defineExpose({ submit });
const emit = defineEmits(['success']);
</script>

<style scoped>
.error-text {
  font-size: small;
}
</style>
