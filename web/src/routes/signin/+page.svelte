<script lang="ts">
  import UserIcon from '$lib/icons/user.svelte';
  import KeyIcon from '$lib/icons/key.svelte';
  import { pb } from '$lib/services/pocketbase';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let errorMessage = '';

  function signIn() {
    errorMessage = '';

    pb.collection('users')
      .authWithPassword(email, password)
      .then(() => {
        goto('/bookmarks');
      })
      .catch(() => {
        errorMessage = 'sign-in failed :(';
        console.error('sign-in failed.');
      });
  }
</script>

<div class="grid place-items-center">
  <div class="daisyui-card daisyui-card-border w-96 shadow-xl">
    <div class="daisyui-card-body">
      <h2 class="daisyui-card-title mb-4 block text-center">Remembit</h2>
      <form id="signin" on:submit|preventDefault={signIn} class="flex flex-col" action="">
        <label class="daisyui-input mb-2 flex items-center gap-2">
          <UserIcon class="h-4 w-4 opacity-70" />
          <input bind:value={email} type="email" placeholder="Email Address" />
        </label>

        <label class="daisyui-input mb-2 flex items-center gap-2">
          <KeyIcon class="h-4 w-4 opacity-70" />
          <input bind:value={password} class="grow" type="password" placeholder="Password" />
        </label>
      </form>
      <span class="text-error">{errorMessage}</span>
      <div class="daisyui-card-actions">
        <input form="signin" type="submit" class="daisyui-btn daisyui-btn-block" value="Sign-In" />
      </div>
    </div>
  </div>
</div>
