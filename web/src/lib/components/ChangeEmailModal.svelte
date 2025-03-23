<script lang="ts">
  import { pb } from '$lib/services/pocketbase';

  export function show() {
    dialogElement.showModal();
  }

  function reset() {
    formElement.reset();
  }

  async function handleSubmit() {
    await pb.collection('users').requestEmailChange(newEmail);
  }

  function validateConfirmEmail() {
    if (newEmail === newEmailConfirm) {
      newEmailConfirmInputElement.setCustomValidity('');
    } else {
      newEmailConfirmInputElement.setCustomValidity('Must match New Email.');
    }
  }

  let newEmail = $state('');
  let newEmailConfirm = $state('');
  let password = $state('');
  let dialogElement: HTMLDialogElement;
  let formElement: HTMLFormElement;
  let passwordInputElement: HTMLInputElement;
  let newEmailConfirmInputElement: HTMLInputElement;
</script>

<dialog bind:this={dialogElement} onclose={reset} class="daisyui-modal">
  <div class="daisyui-modal-box">
    <form id="change-email" bind:this={formElement} onsubmit={handleSubmit} action="">
      <div class="daisyui-join daisyui-join-vertical w-full">
        <label for="new-email" class="daisyui-label font-bold">New Email</label>
        <input
          id="new-email"
          type="email"
          required
          bind:value={newEmail}
          class="daisyui-input daisyui-input-bordered"
        />
      </div>

      <div class="daisyui-join daisyui-join-vertical w-full">
        <label for="confirm-new-email" class="daisyui-label font-bold">Confirm New Email</label>
        <input
          id="confirm-new-email"
          type="email"
          required
          bind:value={newEmailConfirm}
          bind:this={newEmailConfirmInputElement}
          oninput={validateConfirmEmail}
          class="daisyui-input daisyui-input-bordered w-full"
        />
      </div>

      <div class="daisyui-join daisyui-join-vertical w-full">
        <label for="password" class="daisyui-label font-bold">Current Password</label>
        <input
          id="password"
          type="password"
          required
          bind:this={passwordInputElement}
          bind:value={password}
          class="daisyui-input daisyui-input-bordered w-full"
        />
      </div>
    </form>
    <div class="daisyui-modal-action justify-between">
      <button
        onclick={() => {
          dialogElement.close();
        }}
        class="daisyui-btn">Cancel</button
      >
      <button type="submit" form="change-email" class="daisyui-btn daisyui-btn-primary"
        >Submit</button
      >
    </div>
  </div>
</dialog>
