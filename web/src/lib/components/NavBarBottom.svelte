<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import BookmarkIcon from '$lib/icons/bookmark.svelte';
	import PlusSquareIcon from '$lib/icons/plus-square.svelte';
	import BookmarkFormModal from './BookmarkFormModal.svelte';
	import type { SvelteComponent } from 'svelte';

	function handleAdd() {
		bookmarkFormModal.showCreateModal();
	}

	let activeNav = $derived({
		bookmarks: page.url.pathname === '/bookmarks' ? true : false,
		account: page.url.pathname === '/account' ? true : false
	});

	let bookmarkFormModal: SvelteComponent;
</script>

<div class="btm-nav sm:hidden">
	<BookmarkFormModal bind:this={bookmarkFormModal} />

	<button onclick={() => goto('/bookmarks')} class:active={activeNav.bookmarks}>
		<BookmarkIcon />
	</button>
	<button onclick={() => goto('/account')} class:active={activeNav.account}>
		<div class="avatar">
			<div class="w-8 rounded-full">
				<img
					alt="Tailwind CSS Navbar component"
					src="https://gravatar.com/avatar/qweopiruqpoiuqeri"
				/>
			</div>
		</div>
	</button>
</div>
