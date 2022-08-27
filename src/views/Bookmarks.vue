<script setup lang="ts">
import {
  IonPage,
  IonList,
  IonButton,
  IonIcon,
  IonContent,
  IonButtons,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonSearchbar,
  IonModal
} from '@ionic/vue';
import { add, bookmark } from 'ionicons/icons';
import { useBookmarks } from '../store/bookmarks';
import BookmarksModalNew from '../components/BookmarksModalNew.vue';
import BookmarkListEntry from '../components/BookmarkListEntry.vue';
import { ref, computed } from 'vue';
import { useModalControls } from '../composables/modalControls';

// bookmarks store
const bookmarkStore = useBookmarks();

bookmarkStore.fetchBookmarks();

// new bookmark modal
const newBookmarkModal = useModalControls(0.75, [0, 0.25, 0.5, 0.75, 1]);

// search
const search = ref('');
const searchResults = computed(() => {
  return bookmarkStore.bookmarks.filter((bookmark) => {
    const nameLower = bookmark.name.toLowerCase();
    const searchLower = search.value.toLowerCase();
    const emptySearch = search.value === '' ? true : false;
    const nameFound = nameLower.includes(searchLower) ? true : false;
    const tagFound = bookmark.tags.includes(searchLower) ? true : false;

    return emptySearch || nameFound || tagFound ? true : false;
  });
});
</script>

<template>
  <ion-page id="bookmarks-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Bookmarks</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="newBookmarkModal.toggle()">
            <ion-icon :icon="bookmark"></ion-icon>
            <ion-icon :icon="add"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar collaps>
        <ion-searchbar
          id="searchbar"
          v-model="search"
          enterkeyhint="search"
          inputmode="search"
          type="search"></ion-searchbar> </ion-toolbar
    ></ion-header>

    <ion-content>
      <!-- Bookmark List -->
      <ion-list>
        <!-- Bookmark Item -->
        <BookmarkListEntry
          v-for="bookmark in searchResults"
          :key="bookmark.id"
          :bookmark-id="bookmark.id!" />
      </ion-list>
    </ion-content>
    <ion-modal
      :is-open="newBookmarkModal.isOpen.value"
      :breakpoints="newBookmarkModal.breakPoints"
      :initial-breakpoint="newBookmarkModal.initialBreakPoint"
      @will-dismiss="newBookmarkModal.toggle()">
      <BookmarksModalNew />
    </ion-modal>
  </ion-page>
</template>

<style scoped>
#searchbar {
  --box-shadow: none;
}
</style>
