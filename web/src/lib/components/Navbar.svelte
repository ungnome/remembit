<script lang="ts">
	import { currentUser } from '$lib/stores/user';
	import { searchString, bookmarksFiltered } from '$lib/stores/bookmarks';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import BookmarkFormModal from './BookmarkFormModal.svelte';
	import BookmarkIcon from '$lib/icons/bookmark.svelte';
	import type { SvelteComponent } from 'svelte';

	function handleSignout() {
		goto('/signout');
	}

	function handleCreate() {
		bookmarkFormModal.showCreateModal();
	}

	let bookmarkFormModal: SvelteComponent;
</script>

<div class="navbar bg-base-100">
	<div class="navbar-start">
		<a class="btn btn-ghost text-xl" href="/">remembit</a>
	</div>

	{#if $currentUser}
		{#if page.url.pathname === '/bookmarks'}
			<BookmarkFormModal bind:this={bookmarkFormModal} />
			<div class="navbar-center">
				<input
					class="input input-md input-bordered mx-3"
					placeholder="Search"
					bind:value={$searchString}
				/>
				<button class="btn btn-md" onclick={handleCreate}
					>Add <BookmarkIcon class="size-4" /></button
				>
			</div>
		{/if}
		<div class="navbar-end">
			<div class="nav-end flex-none gap-2">
				<div class="dropdown dropdown-end">
					<div tabindex="0" role="button" class="avatar btn btn-circle btn-ghost">
						<div class="w-10 rounded-full">
							<img
								alt="Tailwind CSS Navbar component"
								src="https://gravatar.com/avatar/qweopiruqpoiuqeri"
							/>
						</div>
					</div>
					<ul class="menu dropdown-content z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
						<li><a href="/account">Account</a></li>
						<li><a href="/signin" onclick={handleSignout}>Sign Out</a></li>
					</ul>
				</div>
			</div>
		</div>
	{:else if page.url.pathname !== '/signin'}
		<div class="navbar-end">
			<a href="/signin" class="btn">Sign-In</a>
		</div>
	{/if}
</div>
