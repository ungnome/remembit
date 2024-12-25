<script lang="ts">
	import {bookmarksFiltered, deleteBookmark } from '$lib/stores/bookmarks';
	import BookmarkFormModal from '$lib/components/BookmarkFormModal.svelte';
	import EditIcon from '$lib/icons/edit.svelte';
	import TrashIcon from '$lib/icons/trash.svelte';
	import type { SvelteComponent } from 'svelte';

	let bookmarkFormModal: SvelteComponent;
</script>

<BookmarkFormModal bind:this={bookmarkFormModal} />

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
		{#each $bookmarksFiltered as bookmark (bookmark.id)}
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
							<button
								class="btn btn-ghost btn-sm"
								on:click|stopPropagation={() => {
									bookmarkFormModal.showEditModal(bookmark.id);
								}}
							>
								<EditIcon class="size-4 text-info" />
							</button>
						</li>
						<li>
							<button
								class="btn btn-ghost btn-error btn-sm"
								on:click|stopPropagation={async () => {
									await deleteBookmark(bookmark.id);
								}}
							>
								<TrashIcon class="size-4 text-error" />
							</button>
						</li>
					</ul>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
