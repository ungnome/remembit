<script lang="ts">
  import user from '$lib/stores/user.svelte';
</script>

{#if user.isValid}
  <nav class="daisyui-navbar bg-base-100 sticky top-0 z-10 flex justify-between gap-5">
    <div class="daisyui-navbar-start">
      <a class="daisyui-btn daisyui-btn-ghost text-xl" href="/">remembit</a>
    </div>

    <div class="daisyui-navbar-end">
      <div class="daisyui-dropdown daisyui-dropdown-end pr-4 pl-7">
        <div
          tabindex="0"
          role="button"
          class="daisyui-avatar daisyui-btn daisyui-btn-circle daisyui-btn-ghost"
        >
          <div class="ring-primary ring-offset-base-100 w-8 rounded-full ring-3 ring-offset-2">
            <img alt="" src={user.gravatar} />
          </div>
        </div>
        <ul
          tabindex="-1"
          class="daisyui-menu daisyui-dropdown-content rounded-box bg-base-100 z-1 mt-3 w-52 p-2 shadow-sm"
        >
          <li><a href="/account">Account</a></li>
          <li><a href="/signout">Sign Out</a></li>
        </ul>
      </div>
    </div>
  </nav>
{:else}
  <nav class="daisyui-navbar bg-base-100 sticky top-0 z-10 flex justify-between">
    <a class="daisyui-btn daisyui-btn-ghost text-xl" href="/">remembit</a>

    <div class="">
      <a href="/signin" class="daisyui-btn">Sign-In</a>
    </div>
  </nav>
{/if}
