<script lang="ts">
  import BookmarkFormModal from '$lib/components/BookmarkFormModal.svelte';
  import { onMount, type SvelteComponent } from 'svelte';
  import bookmarks from '$lib/stores/bookmarks.svelte';
  import BookmarkTableRow from '$lib/components/BookmarkTableRow.svelte';

  onMount(() => {
    bookmarks.refresh();
  });

  let bookmarkFormModal: SvelteComponent;
  let bookmarkList = $derived(bookmarks.filtered.length > 0 ? bookmarks.filtered : bookmarks.all);

  function handleAdd() {
    bookmarkFormModal.showCreateModal();
    bookmarks.refresh();
  }
</script>

<BookmarkFormModal bind:this={bookmarkFormModal} />

<div class="mx-4 my-2 flex gap-4">
  <button class="daisyui-btn" onclick={handleAdd}>Add</button>
  <input
    type="search"
    placeholder="Search"
    class="daisyui-input daisyui-input-bordered flex-grow"
    bind:value={bookmarks.filter}
  />
</div>

<div class="h-[calc(100vh-8rem)] overflow-x-auto">
  <table class="daisyui-table daisyui-table-pin-rows">
    <thead>
      <tr>
        <th>Name</th>
        <th>URL</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {#each bookmarkList as bookmark (bookmark.id)}
        <BookmarkTableRow {bookmark} />
      {/each}
    </tbody>
  </table>
</div>
