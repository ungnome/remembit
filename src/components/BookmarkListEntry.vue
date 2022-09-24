<script setup lang="ts">
import {
  IonList,
  IonItem,
  IonLabel,
  IonChip,
  IonButtons,
  IonButton,
  IonIcon,
  IonPopover
} from '@ionic/vue';
import { pencilOutline, trashOutline, ellipsisHorizontalOutline } from 'ionicons/icons';
import { defineProps, computed } from 'vue';
import { useBookmarks, Bookmark } from '../store/bookmarks';
import BookmarkFormModal from './BookmarkFormModal.vue';
import { useModalControls } from '../composables/modalControls';

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

const editModal = useModalControls(0.75, [0, 0.25, 0.5, 0.75, 1], BookmarkFormModal, {
  formType: 'edit',
  bookmarkId: props.bookmarkId
});

function deleteBookmark() {
  bookmarksStore.deleteBookmark(bookmark.value);
}
</script>

<template>
  <ion-item :href="bookmark.url" target="_blank" rel="noopener" :detail="false">
    <ion-label>
      <h2>{{ bookmark.name }}</h2>
      <ion-chip v-for="tag in bookmark.tags" :key="bookmark.tags.indexOf(tag)" disabled>
        {{ tag }}
      </ion-chip>
    </ion-label>

    <ion-buttons>
      <ion-button
        :id="`options-menu-button-${bookmark.id}`"
        shape="round"
        fill="clear"
        @click.prevent="">
        <ion-icon :icon="ellipsisHorizontalOutline"></ion-icon>

        <!-- Options Menu -->
        <ion-popover
          :dismiss-on-select="true"
          :trigger="`options-menu-button-${bookmark.id}`">
          <ion-list>
            <ion-item button :detail="false" @click.prevent="editModal.show()">
              <ion-icon
                class="ion-margin-end"
                color="primary"
                :icon="pencilOutline"></ion-icon>
              <ion-label color="primary"> Edit </ion-label>
            </ion-item>

            <ion-item
              button
              lines="none"
              :detail="false"
              @click.prevent="deleteBookmark()">
              <ion-icon
                class="ion-margin-end"
                size="small"
                color="danger"
                :icon="trashOutline"></ion-icon>
              <ion-label color="danger"> Delete </ion-label>
            </ion-item>
          </ion-list>
        </ion-popover>
      </ion-button></ion-buttons
    >
  </ion-item>
</template>

<style scoped></style>
