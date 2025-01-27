<script lang="ts">
	import { bookmarks, Bookmark } from '$lib/stores/bookmarks.svelte';

	export function showEditModal(bookmarkId: string) {
		resetModal();

		bookmarkToEdit = bookmarks.all.find((bookmark) => {
			return bookmark.id === bookmarkId;
		});

		if (bookmarkToEdit) {
			dialogType = 'edit';
			name = bookmarkToEdit.name;
			url = bookmarkToEdit.url;
		}

		bookmarkFormDialog.showModal();
	}

	export function showCreateModal() {
		resetModal();
		dialogType = 'create';
		bookmarkFormDialog.showModal();
	}

	let dialogType: 'create' | 'edit';
	let bookmarkFormDialog: HTMLDialogElement;
	let bookmarkToEdit: undefined | Bookmark;
	let name = '';
	let url = '';

	async function handleSubmit() {
		switch (dialogType) {
			case 'create':
				await bookmarks.create({ name: name, url: url });
				break;
			case 'edit':
				if (bookmarkToEdit) {
					await bookmarkToEdit.update({ name: name, url: url });
				} else {
					throw "Couldn't update bookmark!";
				}
				break;
		}

		await bookmarks.refresh();
	}

	function resetModal() {
		bookmarkToEdit = undefined;
		name = '';
		url = '';
	}
</script>

<dialog
	class="daisyui-modal daisyui-modal-bottom sm:daisyui-modal-middle"
	bind:this={bookmarkFormDialog}
>
	<div class="daisyui-modal-box">
		<h3 class="mb-6 text-lg font-bold capitalize">{dialogType} Bookmark</h3>
		<form on:submit={handleSubmit} action="" method="dialog">
			<label class="daisyui-input daisyui-input-bordered mb-2 flex items-center gap-2">
				<input bind:value={name} class="grow" type="text" placeholder="Name" required />
			</label>
			<label class="daisyui-input daisyui-input-bordered mb-2 flex items-center gap-2">
				<input bind:value={url} class="grow" type="url" placeholder="Url" required />
			</label>
			<div class="daisyui-modal-action">
				<button type="submit" class="daisyui-btn">Submit</button>
			</div>
		</form>
	</div>
</dialog>
