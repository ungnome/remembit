<script lang="ts">
	import { bookmarks } from '$lib/bookmarks';
	import BookmarkFormModal from '$lib/BookmarkFormModal.svelte';
	import EditIcon from '$lib/icons/edit.svelte';
	import TrashIcon from '$lib/icons/trash.svelte';
	import BookmarkIcon from '$lib/icons/bookmark.svelte';
	import type { SvelteComponent } from 'svelte';

	let bookmarkFormModal: SvelteComponent;
</script>

<h1>Bookmarks Page</h1>
<BookmarkFormModal bind:this={bookmarkFormModal} />

<button
	class="btn"
	on:click={() => {
		bookmarkFormModal.showCreateModal();
	}}>Create <BookmarkIcon class="size-5" /></button
>

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
