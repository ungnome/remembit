<script lang="ts">
	import { currentUser } from '$lib/pocketbase';
	import { bookmarks } from '$lib/bookmarks';
	import BookmarkFormModal from '$lib/BookmarkFormModal.svelte';
	import type { SvelteComponent } from 'svelte';
	import EditIcon from '$lib/icons/edit.svelte';
	import TrashIcon from '$lib/icons/trash.svelte';

	let newBookmarkForm: SvelteComponent;
	let updateBookmarkForm: SvelteComponent;

	function logUser() {
		console.log($currentUser);
	}

	function logBookmarks() {
		console.log($bookmarks);
	}
</script>

<h1>Bookmarks Page</h1>

<table class="table">
	<!-- head -->
	<thead>
		<tr>
			<th>Name</th>
			<th>URL</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		{#each $bookmarks as bookmark (bookmark.id)}
			<tr
				class="hover"
				on:click={() => {
					window.open(bookmark.url, '_blank');
				}}
			>
				<td>{bookmark.name}</td>
				<td>{bookmark.url}</td>
				<td class="text-end">
					<ul class="menu menu-horizontal rounded-box p-0">
						<li>
							<button class="btn btn-ghost btn-sm">
								<EditIcon class="size-4 text-info" />
							</button>
						</li>
						<li>
							<button class="btn btn-ghost btn-error btn-sm">
								<TrashIcon class="size-4 text-error" />
							</button>
						</li>
					</ul>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
