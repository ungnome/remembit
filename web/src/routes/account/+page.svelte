<script lang="ts">
  import ChangeEmailModal from '$lib/components/ChangeEmailModal.svelte';
  import ChangePasswordModal from '$lib/components/ChangePasswordModal.svelte';
  import type { SvelteComponent } from 'svelte';
  import user from '$lib/stores/user.svelte';
  import { goto } from '$app/navigation';

  let newName = $state('');
  let hasChanged = $derived.by(() => (newName.length > 0 ? true : false));
  let changeEmailModal: SvelteComponent;
  let changePasswordModal: SvelteComponent;

  function handleDelete() {
    user.deleteAccount().then(() => {
      goto('/');
    });
  }

  function handleSave() {
    user.updateName(newName).then(() => {
      newName = '';
    });
  }
</script>

<ChangeEmailModal bind:this={changeEmailModal} />
<ChangePasswordModal bind:this={changePasswordModal} />

<div class="mx-4 grid place-items-center space-y-96 sm:mx-0">
  <div class="grid w-full sm:w-[35rem]">
    <h2 class="justify-self-center text-xl font-bold">Account</h2>

    <label for="name" class="daisyui-label font-bold">Name</label>
    <input
      type="text"
      class="daisyui-input daisyui-input-bordered"
      placeholder={user.name}
      bind:value={newName}
    />

    <label for="email" class="daisyui-label font-bold">Email</label>
    <span class="mb-2">{user.email}</span>
    <button
      onclick={() => {
        changeEmailModal.show();
      }}
      class="daisyui-btn max-w-xs"
    >
      Change Email
    </button>

    <label for="change-password" class="daisyui-label font-bold">Password</label>
    <button
      id="change-password"
      onclick={() => {
        changePasswordModal.show();
      }}
      class="daisyui-btn max-w-xs">Change Password</button
    >

    <div class="daisyui-divider"></div>

    <div class="flex justify-between">
      <button class="daisyui-btn daisyui-btn-outline daisyui-btn-error" onclick={handleDelete}>
        Delete Account
      </button>
      <button
        class="daisyui-btn {hasChanged ? 'daisyui-btn-primary' : 'daisyui-btn-disabled'}"
        onclick={handleSave}
      >
        Save
      </button>
    </div>
  </div>
</div>
