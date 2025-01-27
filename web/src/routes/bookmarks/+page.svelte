<script lang="ts">
	import BookmarkFormModal from '$lib/components/BookmarkFormModal.svelte';
	import EditIcon from '$lib/icons/edit.svelte';
	import TrashIcon from '$lib/icons/trash.svelte';
	import { onMount, type SvelteComponent } from 'svelte';
	import bookmarks from '$lib/stores/bookmarks.svelte';

	onMount(() => {
		bookmarks.refresh();
	});

	let bookmarkFormModal: SvelteComponent;
	let bookmarkList = $derived(bookmarks.filtered.length > 0 ? bookmarks.filtered : bookmarks.all);

	function handleAdd() {
		bookmarkFormModal.showCreateModal();
		bookmarks.refresh();
	}

	function handleOpen(url: string): void {
		window.open(url, '_blank');
	}
</script>

<BookmarkFormModal bind:this={bookmarkFormModal} />

<div class="mx-4 my-2 flex gap-4">
	<button class="daisyui-btn" onclick={handleAdd}>Add</button>
	<input
		type="search"
		placeholder="Search"
		class="daisyui-input daisyui-input-bordered flex-grow"
		bind:value={bookmarks.filter}
	/>
</div>

<div class="h-[calc(100vh-8rem)] overflow-x-auto">
	<table class="daisyui-table daisyui-table-pin-rows">
		<thead>
			<tr>
				<th>Name</th>
				<th>URL</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each bookmarkList as bookmark (bookmark.id)}
				<tr
					class="hover"
					onclick={() => {
						handleOpen(bookmark.url);
					}}
				>
					<td>{bookmark.name}</td>
					<td>{bookmark.url}</td>
					<td class="text-end">
						<ul class="daisyui-menu daisyui-menu-horizontal rounded-box p-0">
							<li>
								<button
									class="daisyui-btn daisyui-btn-ghost daisyui-btn-sm"
									onclick={(event) => {
										event.stopPropagation();
										bookmarkFormModal.showEditModal(bookmark.id);
										bookmarks.refresh();
									}}
								>
									<EditIcon class="size-4 text-info" />
								</button>
							</li>
							<li>
								<button
									class="daisyui-btn daisyui-btn-ghost daisyui-btn-error daisyui-btn-sm"
									onclick={async (event) => {
										event.stopPropagation();
										await bookmark.delete();
										await bookmarks.refresh();
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
