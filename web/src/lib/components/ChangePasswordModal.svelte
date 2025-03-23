<script lang="ts">
  import { pb } from '$lib/services/pocketbase';

  export function show() {
    dialogElement.showModal();
  }

  function close() {
    formElement.reset();
  }

  async function handleSubmit() {
    const id = pb.authStore.record!.id;
    const data = {
      password: newPassword,
      passwordConfirm: newPasswordConfirm,
      oldPassword: currentPassword
    };

    await pb.collection('users').update(id, data);
    close();
  }

  let newPassword = $state('');
  let newPasswordConfirm = $state('');
  let currentPassword = $state('');
  let dialogElement: HTMLDialogElement;
  let formElement: HTMLFormElement;
</script>

<dialog bind:this={dialogElement} onclose={close} class="daisyui-modal">
  <div class="daisyui-modal-box">
    <form
      bind:this={formElement}
      onsubmit={handleSubmit}
      method="dialog"
      action=""
      id="change-password"
    >
      <div class="daisyui-join daisyui-join-vertical w-full">
        <label for="new-password" class="daisyui-label font-bold">New Password</label>
        <input
          id="new-password"
          type="password"
          required
          bind:value={newPassword}
          class="daisyui-input"
        />
      </div>

      <div class="daisyui-join daisyui-join-vertical w-full">
        <label for="new-password-confirm" class="daisyui-label font-bold"
          >Confirm New Password</label
        >
        <input
          id="new-password-confirm"
          type="password"
          required
          bind:value={newPasswordConfirm}
          class="daisyui-input"
        />
      </div>

      <div class="daisyui-join daisyui-join-vertical w-full">
        <label for="current-password" class="daisyui-label font-bold">Current Password</label>
        <input
          id="current-password"
          type="password"
          required
          bind:value={currentPassword}
          class="daisyui-input"
        />
      </div>
    </form>
    <div class="daisyui-modal-action justify-between">
      <button
        onclick={() => {
          dialogElement.close();
        }}
        class="btn">Cancel</button
      >
      <button type="submit" form="change-password" class="daisyui-btn daisyui-btn-primary"
        >Submit</button
      >
    </div>
  </div>
</dialog>
