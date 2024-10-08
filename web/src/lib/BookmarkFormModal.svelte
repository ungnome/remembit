<script lang="ts">
	import { createBookmark, updateBookmark, bookmarks } from '$lib/bookmarks';
	import type { Bookmark } from '$lib/pocketbase';

	export function showEditModal(bookmarkId: string) {
		resetModal();
		bookmarkToEdit = $bookmarks.find(({ id }) => {
			return id === bookmarkId;
		});

		if (bookmarkToEdit) {
			name = bookmarkToEdit.name;
			url = bookmarkToEdit.url;
			dialogType = 'update';

			bookmarkFormDialog.showModal();
		} else {
			throw 'Bookmark to edit not found.';
		}
	}

	export function showCreateModal() {
		resetModal();
		dialogType = 'create';
		bookmarkFormDialog.showModal();
	}

	let dialogType: 'create' | 'update';
	let bookmarkFormDialog: HTMLDialogElement;
	let bookmarkToEdit: undefined | Bookmark = undefined;
	let name = '';
	let url = '';

	function handleSubmit() {
		switch (dialogType) {
			case 'create':
				createBookmark(name, url);
				break;
			case 'update':
				if (bookmarkToEdit) {
					updateBookmark(bookmarkToEdit.id, name, url);
				} else {
					throw "Couldn't update bookmark!";
				}
				break;
		}
	}

	function resetModal() {
		bookmarkToEdit = undefined;
		name = '';
		url = '';
	}
</script>

<dialog class="modal" bind:this={bookmarkFormDialog}>
	<div class="modal-box">
		<h3 class="mb-6 text-lg font-bold capitalize">{dialogType} Bookmark</h3>
		<form on:submit={handleSubmit} action="" method="dialog">
			<label class="input input-bordered mb-2 flex items-center gap-2">
				<input bind:value={name} class="grow" type="text" placeholder="Name" required />
			</label>
			<label class="input input-bordered mb-2 flex items-center gap-2">
				<input bind:value={url} class="grow" type="url" placeholder="Url" required />
			</label>
			<div class="modal-action">
				<button type="submit" class="btn">Submit</button>
			</div>
		</form>
	</div>
</dialog>
