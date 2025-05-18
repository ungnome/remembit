<script lang="ts">
  import type { SvelteComponent } from 'svelte';
  import { bookmarks, type Bookmark } from '$lib/stores/bookmarks.svelte';
  import BookmarkEditDialog from './BookmarkEditDialog.svelte';
  import ExternalLinkIcon from '$lib/icons/external-link.svelte';
  import EditIcon from '$lib/icons/edit.svelte';
  import TrashIcon from '$lib/icons/trash.svelte';

  let { bookmark }: { bookmark: Bookmark } = $props();

  let editDialog: SvelteComponent;
  let bookmarkHostname = new URL(bookmark.url).hostname;
  let faviconSrc = `https://icon.horse/icon/${bookmarkHostname}`;

  function handleOpen() {
    window.open(bookmark.url, '_blank');
  }

  function handleEdit(event: Event) {
    event.stopPropagation();
    editDialog.show();
  }

  async function handleDelete() {
    await bookmark.delete();
    await bookmarks.refresh();
  }
</script>

<li class="daisyui-list-row flex">
  <BookmarkEditDialog bind:this={editDialog} {bookmark} />

  <div class="min-w-0 grow">
    <div class="flex">
      <div class="daisyui-avatar mr-4">
        <div class="size-8 rounded-xl">
          <img src={faviconSrc} alt="" />
        </div>
      </div>
      <div class="flex flex-col truncate">
        <span class="block truncate">{bookmark.name}</span>
        <span class="text-base-content/50 truncate text-xs italic">{bookmark.url}</span>
      </div>
    </div>
  </div>

  <button
    class="daisyui-btn daisyui-btn-square daisyui-btn-soft daisyui-btn-info daisyui-btn-sm"
    onclick={handleOpen}
  >
    <ExternalLinkIcon class="size-4" />
  </button>

  <button
    class="daisyui-btn daisyui-btn-square daisyui-btn-soft daisyui-btn-accent daisyui-btn-sm"
    onclick={handleEdit}
  >
    <EditIcon class="size-4" />
  </button>

  <button
    class="daisyui-btn daisyui-btn-square daisyui-btn-soft daisyui-btn-error daisyui-btn-sm"
    onclick={handleDelete}
  >
    <TrashIcon class="size-4" />
  </button>
</li>
