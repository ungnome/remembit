<script lang="ts">
	import { bookmarksFiltered, deleteBookmark, searchString } from '$lib/stores/bookmarks';
	import BookmarkFormModal from '$lib/components/BookmarkFormModal.svelte';
	import EditIcon from '$lib/icons/edit.svelte';
	import TrashIcon from '$lib/icons/trash.svelte';
	import type { SvelteComponent } from 'svelte';
	import PlusIcon from '$lib/icons/plus.svelte';

	let bookmarkFormModal: SvelteComponent;
</script>

<BookmarkFormModal bind:this={bookmarkFormModal} />

<div class="mx-4 my-2 flex gap-4">
	<button
		class="daisyui-btn"
		on:click={() => {
			bookmarkFormModal.showCreateModal();
		}}>Add</button
	>
	<input
		type="search"
		placeholder="Search"
		class="daisyui-input daisyui-input-bordered flex-grow"
		bind:value={$searchString}
	/>
</div>

<div class="h-[calc(100vh-8rem)] overflow-x-auto">
	<table class="daisyui-table daisyui-table-pin-rows">
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
						<ul class="daisyui-menu daisyui-menu-horizontal rounded-box p-0">
							<li>
								<button
									class="daisyui-btn daisyui-btn-ghost daisyui-btn-sm"
									on:click|stopPropagation={() => {
										bookmarkFormModal.showEditModal(bookmark.id);
									}}
								>
									<EditIcon class="size-4 text-info" />
								</button>
							</li>
							<li>
								<button
									class="daisyui-btn daisyui-btn-ghost daisyui-btn-error daisyui-btn-sm"
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
</div>
