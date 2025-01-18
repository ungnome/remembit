<script lang="ts">
	import { currentUser, gravatar } from '$lib/stores/user';
	import { searchString } from '$lib/stores/bookmarks';
	import { page } from '$app/state';
	import BookmarkFormModal from './BookmarkFormModal.svelte';
	import BookmarkIcon from '$lib/icons/bookmark.svelte';
	import type { SvelteComponent } from 'svelte';

	function handleCreate() {
		bookmarkFormModal.showCreateModal();
	}

	let bookmarkFormModal: SvelteComponent;
</script>

<BookmarkFormModal bind:this={bookmarkFormModal} />

{#if $currentUser}
	<nav class="daisyui-navbar sticky top-0 z-10 flex justify-between gap-5 bg-base-100">
		<a class="daisyui-btn daisyui-btn-ghost text-xl" href="/">remembit</a>

		{#if page.url.pathname === '/bookmarks'}
			<span class="collapse w-full sm:visible lg:w-4/6">
				<input
					class="daisyui-input daisyui-input-md daisyui-input-bordered mx-3 w-full"
					placeholder="Search"
					bind:value={$searchString}
				/>
				<button class="daisyui-btn" onclick={handleCreate}
					>Add <BookmarkIcon class="size-4" /></button
				>
			</span>
		{/if}

		<div class="daisyui-dropdown daisyui-dropdown-end pl-7 pr-4">
			<div
				tabindex="0"
				role="button"
				class="daisyui-avatar daisyui-btn daisyui-btn-circle daisyui-btn-ghost"
			>
				<div class="w-8 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
					<img alt="Avatar" src={$gravatar} />
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
	</nav>
{:else}
	<nav class="daisyui-navbar sticky top-0 z-10 flex justify-between bg-base-100">
		<a class="daisyui-btn daisyui-btn-ghost text-xl" href="/">remembit</a>

		<div class="">
			<a href="/signin" class="daisyui-btn">Sign-In</a>
		</div>
	</nav>
{/if}
