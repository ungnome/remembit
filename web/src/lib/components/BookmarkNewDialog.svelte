<script lang="ts">
  import { bookmarks } from '$lib/stores/bookmarks.svelte';

  export function show() {
    dialogElement.showModal();
  }

  let dialogElement: HTMLDialogElement;
  let name = '';
  let url = '';

  async function submit() {
    await bookmarks.create({ name: name, url: url });
    await bookmarks.refresh();
  }

  function reset() {
    name = '';
    url = '';
  }
</script>

<dialog
  class="daisyui-modal daisyui-modal-bottom sm:daisyui-modal-middle"
  bind:this={dialogElement}
  onclose={reset}
>
  <div class="daisyui-modal-box">
    <h3 class="mb-6 text-lg font-bold capitalize">Add Bookmark</h3>

    <form onsubmit={submit} action="" method="dialog">
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
