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

<!-- Navbar for screensize < sm  -->
<div class="navbar sm:hidden">
	{#if $currentUser && page.url.pathname === '/bookmarks'}
		<input
			class="input input-md input-bordered mx-3 w-full"
			placeholder="Search"
			bind:value={$searchString}
		/>
		<button class="btn btn-md mr-3" onclick={handleCreate}
			>Add <BookmarkIcon class="size-4" /></button
		>
	{/if}
</div>

<!-- Navbar for screen size > sm -->
<div class="hidden bg-base-100 sm:navbar">
	<div class="navbar-start">
		<a class="btn btn-ghost text-xl" href="/">remembit</a>
	</div>

	{#if $currentUser}
		{#if page.url.pathname === '/bookmarks'}
			<div class="sm:navbar-center">
				<input
					class="input input-md input-bordered mx-3 w-full"
					placeholder="Search"
					bind:value={$searchString}
				/>
				<button class="btn btn-md" onclick={handleCreate}
					>Add <BookmarkIcon class="size-4" /></button
				>
			</div>
		{/if}
		<div class="navbar-end">
			<div class="nav-end gap-2">
				<div class="dropdown dropdown-end">
					<div tabindex="0" role="button" class="avatar btn btn-circle btn-ghost">
						<div class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
							<img
								alt="Avatar"
								src={$gravatar}
							/>
						</div>
					</div>
					<ul
						tabindex="-1"
						class="menu dropdown-content z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
					>
						<li><a href="/account">Account</a></li>
						<li><a href="/signout">Sign Out</a></li>
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
