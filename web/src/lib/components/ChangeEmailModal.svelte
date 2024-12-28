<script lang="ts">
	import { changeEmail } from '$lib/stores/user';

	export function show() {
		dialogElement.showModal();
	}

	function reset() {
		formElement.reset();
	}

	async function handleSubmit() {
		await changeEmail(newEmail);
	}

	let newEmail = $state('');
	let newEmailConfirm = $state('');
	let password = $state('');
	let dialogElement: HTMLDialogElement;
	let formElement: HTMLFormElement;
</script>

<dialog bind:this={dialogElement} onclose={reset} class="modal">
	<div class="modal-box">
		<form id="change-email" bind:this={formElement} onsubmit={handleSubmit} action="">
			<div class="join join-vertical w-full">
				<label for="new-email" class="label font-bold">New Email</label>
				<input id="new-email" type="email" bind:value={newEmail} class="input input-bordered" />
			</div>

			<div class="join join-vertical w-full">
				<label for="confirm-new-email" class="label font-bold">Confirm New Email</label>
				<input
					id="confirm-new-email"
					type="email"
					bind:value={newEmailConfirm}
					class="input input-bordered w-full"
				/>
			</div>

			<div class="join join-vertical w-full">
				<label for="password" class="label font-bold">Current Password</label>
				<input
					id="password"
					type="password"
					bind:value={password}
					class="input input-bordered w-full"
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
			<button type="submit" form="change-email" class="btn btn-primary">Submit</button>
		</div>
	</div>
</dialog>
