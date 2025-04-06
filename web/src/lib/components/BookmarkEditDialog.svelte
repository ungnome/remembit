<script lang="ts">
  import { bookmarks, type Bookmark } from '$lib/stores/bookmarks.svelte';

  let { bookmark }: { bookmark: Bookmark } = $props();

  let dialogElement: HTMLDialogElement;
  let name = $state(bookmark.name);
  let url = $state(bookmark.url);

  async function submit() {
    await bookmark.update({ name: name, url: url });
    await bookmarks.refresh();
  }

  export function show() {
    dialogElement.showModal();
  }
</script>

<dialog class="daisyui-modal daisyui-modal-bottom sm:daisyui-modal-middle" bind:this={dialogElement}>
  <div class="daisyui-modal-box">
    <h3 class="mb-6 text-lg font-bold capitalize">Edit Bookmark</h3>
    <form onsubmit={submit} action="" method="dialog" >
      <label class="daisyui-floating-label mb-6 flex items-center">
        <span>Name</span>
        <input bind:value={name} class="daisyui-input grow" type="text" placeholder="Name" required />
      </label>
      <label class="daisyui-floating-label flex items-center">
        <span>Url</span>
        <input bind:value={url} class="daisyui-input grow" type="url" placeholder="Url" required />
      </label>
      <div class="daisyui-modal-action">
        <button type="submit" class="daisyui-btn">Submit</button>
      </div>
    </form>
  </div>
</dialog>
