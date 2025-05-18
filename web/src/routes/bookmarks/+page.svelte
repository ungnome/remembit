<script lang="ts">
  import BookmarkNewDialog from '$lib/components/BookmarkNewDialog.svelte';
  import BookmarkListItem from '$lib/components/BookmarkListItem.svelte';
  import { onMount, type SvelteComponent } from 'svelte';
  import { bookmarks, type Bookmark } from '$lib/stores/bookmarks.svelte';

  onMount(() => {
    bookmarks.refresh();
  });

  let newBookmarkDialog: SvelteComponent;
  let bookmarkList = $derived(bookmarks.filtered.length > 0 ? bookmarks.filtered : bookmarks.all);

  function handleAdd() {
    newBookmarkDialog.show();
    bookmarks.refresh();
  }
</script>

<BookmarkNewDialog bind:this={newBookmarkDialog} />

<div class="mx-2">
  <div class="bg-base-100 sticky top-16 z-1 pb-2">
    <div class="flex gap-4">
      <button class="daisyui-btn daisyui-btn-primary" onclick={handleAdd}>Add</button>
      <label for="" class="daisyui-floating-label flex grow items-center">
        <span>Search</span>
        <input type="search" placeholder="Search" class="daisyui-input grow" bind:value={bookmarks.filter} />
      </label>
    </div>
  </div>

  <ul class="daisyui-list bg-base-100 rounded-box shadow-none">
    {#each bookmarkList as bookmark (bookmark.id)}
      <BookmarkListItem {bookmark} />
    {/each}
  </ul>
</div>
