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
    <h3 class="mb-6 text-lg font-bold capitalize">Change Email</h3>

    <form bind:this={formElement} onsubmit={handleSubmit} action="" class="flex flex-col gap-6">
      <label class="daisyui-floating-label flex">
        <span>New Email</span>
        <input
          type="email"
          required
          bind:value={newEmail}
          placeholder="New Email"
          class="daisyui-input grow"
        />
      </label>

      <label class="daisyui-floating-label flex">
        <span>Confirm New Email</span>
        <input
          type="email"
          required
          bind:value={newEmailConfirm}
          bind:this={newEmailConfirmInputElement}
          oninput={validateConfirmEmail}
          placeholder="Confirm new email"
          class="daisyui-input grow"
        />
      </label>

      <label for="" class="daisyui-floating-label flex">
        <span>Password</span>
        <input
          type="password"
          required
          bind:this={passwordInputElement}
          bind:value={password}
          placeholder="Password"
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
      <button type="submit" form="change-email" class="daisyui-btn daisyui-btn-primary">Submit</button>
    </div>
  </div>

  <form method="dialog" class="daisyui-modal-backdrop">
    <button>close</button>
  </form>
</dialog>
