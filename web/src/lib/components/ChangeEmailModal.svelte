<script lang="ts">
	import { currentUser } from '$lib/stores/user';
	import { pb } from '$lib/services/pocketbase';

	export function show() {
		dialogElement.showModal();
	}

	function reset() {
		formElement.reset();
	}

	async function handleSubmit() {
		await pb.collection('users').requestEmailChange(newEmail);
	}

	function validateConfirmEmail() {
		if (newEmail === newEmailConfirm) {
			newEmailConfirmInputElement.setCustomValidity('');
		} else {
			newEmailConfirmInputElement.setCustomValidity('Must match New Email.');
		}
	}

	function validatePassword() {
		if (password === $currentUser?.password) {
			passwordInputElement.setCustomValidity('');
		} else {
			passwordInputElement.setCustomValidity('Invalid password.');
		}
	}

	let newEmail = $state('');
	let newEmailConfirm = $state('');
	let password = $state('');
	let dialogElement: HTMLDialogElement;
	let formElement: HTMLFormElement;
	let passwordInputElement: HTMLInputElement;
	let newEmailConfirmInputElement: HTMLInputElement;
</script>

<dialog bind:this={dialogElement} onclose={reset} class="modal">
	<div class="modal-box">
		<form id="change-email" bind:this={formElement} onsubmit={handleSubmit} action="">
			<div class="join join-vertical w-full">
				<label for="new-email" class="label font-bold">New Email</label>
				<input
					id="new-email"
					type="email"
					required
					bind:value={newEmail}
					class="input input-bordered"
				/>
			</div>

			<div class="join join-vertical w-full">
				<label for="confirm-new-email" class="label font-bold">Confirm New Email</label>
				<input
					id="confirm-new-email"
					type="email"
					required
					bind:value={newEmailConfirm}
					bind:this={newEmailConfirmInputElement}
					oninput={validateConfirmEmail}
					class="input input-bordered w-full"
				/>
			</div>

			<div class="join join-vertical w-full">
				<label for="password" class="label font-bold">Current Password</label>
				<input
					id="password"
					type="password"
					required
					bind:this={passwordInputElement}
					bind:value={password}
					oninput={validatePassword}
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
