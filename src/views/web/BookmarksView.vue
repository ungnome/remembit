<template>
  <ion-page>
    <ion-content>
      <ion-list>
        <BookmarkItem
          v-for="bookmark in bookmarkStore.bookmarks"
          :key="bookmark.id"
          :bookmark-id="bookmark.id!" />
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonList } from '@ionic/vue';
import { useBookmarks } from '@store/bookmarks';
import BookmarkItem from '@components/common/BookmarkItem.vue';

const bookmarkStore = useBookmarks();
bookmarkStore.fetchBookmarks();
</script>

<style scoped></style>
