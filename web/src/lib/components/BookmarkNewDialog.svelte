<script lang="ts">
  import { bookmarks } from '$lib/stores/bookmarks.svelte';

  export function show() {
    dialogElement.show();
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
      <label class="daisyui-input daisyui-input-bordered mb-2 flex items-center gap-2">
        <input bind:value={name} class="grow" type="text" placeholder="Name" required />
      </label>
      <label class="daisyui-input daisyui-input-bordered mb-2 flex items-center gap-2">
        <input bind:value={url} class="grow" type="url" placeholder="Url" required />
      </label>
      <div class="daisyui-modal-action">
        <button type="submit" class="daisyui-btn">Submit</button>
      </div>
    </form>
  </div>
</dialog>
