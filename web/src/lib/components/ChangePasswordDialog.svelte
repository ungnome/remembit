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
    <h3 class="capticalize mb-6 text-lg font-bold">Change Password</h3>

    <form method="dialog" bind:this={formElement} onsubmit={handleSubmit} class="flex flex-col gap-6">
      <label class="daisyui-floating-label flex">
        <span>New Password</span>
        <input
          type="password"
          bind:value={newPassword}
          required
          placeholder="New Password"
          class="daisyui-input grow"
        />
      </label>

      <label class="daisyui-floating-label flex">
        <span>Confirm new password</span>
        <input
          type="password"
          bind:value={newPasswordConfirm}
          required
          placeholder="Confirm new password"
          class="daisyui-input grow"
        />
      </label>

      <label class="daisyui-floating-label flex">
        <span>Current password</span>
        <input
          type="password"
          bind:value={currentPassword}
          required
          placeholder="Current password"
          class="daisyui-input grow"
        />
      </label>
    </form>

    <div class="daisyui-modal-action justify-between">
      <button
        onclick={() => {
          dialogElement.close();
        }}
        class="daisyui-btn">Cancel</button
      >
      <button type="submit" form="change-password" class="daisyui-btn daisyui-btn-primary">Submit</button>
    </div>
  </div>

  <form method="dialog" class="daisyui-modal-backdrop">
    <button>close</button>
  </form>
</dialog>
