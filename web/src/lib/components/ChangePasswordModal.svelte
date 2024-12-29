<script lang="ts">
	import { pb } from '$lib/services/pocketbase';

	export function show() {
		dialogElement.showModal();
	}

	function close() {
		formElement.reset();
	}

	async function handleSubmit() {
		const id = pb.authStore.record!.id;
		const data = {
			password: newPassword,
			passwordConfirm: newPasswordConfirm,
			oldPassword: currentPassword
		};

		await pb.collection('users').update(id, data);
		close();
	}

	let newPassword = $state('');
	let newPasswordConfirm = $state('');
	let currentPassword = $state('');
	let dialogElement: HTMLDialogElement;
	let formElement: HTMLFormElement;
</script>

<dialog bind:this={dialogElement} onclose={close} class="modal">
	<div class="modal-box">
		<form
			bind:this={formElement}
			onsubmit={handleSubmit}
			method="dialog"
			action=""
			id="change-password"
		>
			<div class="join join-vertical w-full">
				<label for="new-password" class="label font-bold">New Password</label>
				<input
					id="new-password"
					type="password"
					required
					bind:value={newPassword}
					class="input input-bordered"
				/>
			</div>

			<div class="join join-vertical w-full">
				<label for="new-password-confirm" class="label font-bold">Confirm New Password</label>
				<input
					id="new-password-confirm"
					type="password"
					required
					bind:value={newPasswordConfirm}
					class="input input-bordered"
				/>
			</div>

			<div class="join join-vertical w-full">
				<label for="current-password" class="label font-bold">Current Password</label>
				<input
					id="current-password"
					type="password"
					required
					bind:value={currentPassword}
					class="input input-bordered"
				/>
			</div>
		</form>
		<div class="modal-action justify-between">
			<button
				onclick={() => {
					dialogElement.close();
				}}
				class="btn">Cancel</button
			>
			<button type="submit" form="change-password" class="btn btn-primary">Submit</button>
		</div>
	</div>
</dialog>
