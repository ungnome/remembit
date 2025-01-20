<script lang="ts">
	import user from '$lib/stores/user.svelte';

</script>

{#if user.isValid}
	<nav class="daisyui-navbar sticky top-0 z-10 flex justify-between gap-5 bg-base-100">
		<div class="daisyui-navbar-start">
			<a class="daisyui-btn daisyui-btn-ghost text-xl" href="/">remembit</a>
		</div>

		<div class="daisyui-navbar-end">
			<div class="daisyui-dropdown daisyui-dropdown-end pl-7 pr-4">
				<div
					tabindex="0"
					role="button"
					class="daisyui-avatar daisyui-btn daisyui-btn-circle daisyui-btn-ghost"
				>
					<div class="w-8 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
						<img alt="" src={user.gravatar} />
					</div>
				</div>
				<ul
					tabindex="-1"
					class="daisyui-menu daisyui-dropdown-content z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
				>
					<li><a href="/account">Account</a></li>
					<li><a href="/signout">Sign Out</a></li>
				</ul>
			</div>
		</div>
	</nav>
{:else}
	<nav class="daisyui-navbar sticky top-0 z-10 flex justify-between bg-base-100">
		<a class="daisyui-btn daisyui-btn-ghost text-xl" href="/">remembit</a>

		<div class="">
			<a href="/signin" class="daisyui-btn">Sign-In</a>
		</div>
	</nav>
{/if}
