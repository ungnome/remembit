<template>
  <ion-item :href="bookmark.url" target="_blank" rel="noopener" :detail="false">
    <ion-thumbnail slot="start">
      <img :src="faviconSrc(bookmark.url)" alt="" />
    </ion-thumbnail>

    <ion-label>
      <h2 id="label-text">{{ bookmark.name }}</h2>
      <ion-badge v-for="tag in bookmark.tags" :key="bookmark.tags.indexOf(tag)" disabled>
        {{ tag }}
      </ion-badge>
    </ion-label>

    <ion-buttons>
      <ion-button
        :id="`options-menu-button-${bookmark.id}`"
        shape="round"
        fill="clear"
        @click.prevent=""
        @click="showActionSheet()">
        <ion-icon :icon="ellipsisHorizontalOutline"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-item>
</template>

<script setup lang="ts">
import {
  IonItem,
  IonLabel,
  IonButtons,
  IonButton,
  IonIcon,
  IonBadge,
  actionSheetController,
  IonThumbnail
} from '@ionic/vue';
import { ellipsisHorizontalOutline } from 'ionicons/icons';
import { defineProps, computed } from 'vue';
import { useBookmarks, Bookmark } from '@store/bookmarks';
import BookmarkModalEdit from './BookmarkModalEdit.vue';
import { useModalControls } from '@composables/modalControls';

// Props
const props = defineProps({
  bookmarkId: {
    type: String,
    required: true
  }
});

// bookmarks store
const bookmarksStore = useBookmarks();

// get bookmark data
const bookmark = computed(() => {
  return bookmarksStore.bookmarks.find((bookmark) => {
    return bookmark.id === props.bookmarkId;
  }) as Bookmark;
});

// 0.75, [0, 0.25, 0.5, 0.75, 1], BookmarkModalEdit, {
//   bookmarkId: props.bookmarkId
// }

const editModal = useModalControls({
  startingBreakPoint: 0.75,
  breakpointList: [0, 0.25, 0.5, 0.75, 1],
  content: BookmarkModalEdit,
  contentProps: { bookmarkId: props.bookmarkId }
});

function deleteBookmark() {
  bookmarksStore.deleteBookmark(bookmark.value);
}

const showActionSheet = async () => {
  const actionSheet = await actionSheetController.create({
    buttons: [
      {
        text: 'Delete',
        role: 'destructive',
        handler: deleteBookmark
      },
      {
        text: 'Edit',
        handler: editModal.show
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
    ]
  });

  await actionSheet.present();
};

function faviconSrc(url: string) {
  let domain = '';

  if (url.indexOf('://') > -1) {
    // check to see if url starts with a protocol
    domain = url.split('/')[2];
  } else if (url.indexOf('//') === 0) {
    // check if url starts with '//''
    domain = url.split('/')[2];
  } else {
    // default to splitting by '/'
    domain = url.split('/')[0];
  }

  return `https://icon.horse/icon/${domain}`;
}
</script>

<style scoped>
#label-text {
  margin-bottom: 5px;
}
</style>
