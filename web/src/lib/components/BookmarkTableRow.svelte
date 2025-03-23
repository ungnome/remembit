<script lang="ts">
  import { bookmarks, type Bookmark } from '$lib/stores/bookmarks.svelte';
  import type { SvelteComponent } from 'svelte';
  import BookmarkEditDialog from './BookmarkEditDialog.svelte';
  import EditIcon from '$lib/icons/edit.svelte';
  import TrashIcon from '$lib/icons/trash.svelte';

  let { bookmark }: { bookmark: Bookmark } = $props();

  let editDialog: SvelteComponent;

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

<BookmarkEditDialog bind:this={editDialog} {bookmark} />

<tr class="hover" onclick={handleOpen}>
  <td>{bookmark.name}</td>
  <td>{bookmark.url}</td>
  <td class="text-end">
    <ul class="daisyui-menu daisyui-menu-horizontal rounded-box p-0">
      <li>
        <button class="daisyui-btn daisyui-btn-ghost daisyui-btn-sm" onclick={handleEdit}>
          <EditIcon class="size-4 text-info" />
        </button>
      </li>
      <li>
        <button
          class="daisyui-btn daisyui-btn-ghost daisyui-btn-error daisyui-btn-sm"
          onclick={handleDelete}
        >
          <TrashIcon class="size-4 text-error" />
        </button>
      </li>
    </ul>
  </td>
</tr>
