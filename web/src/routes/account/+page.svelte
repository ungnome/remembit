<script lang="ts">
	import { currentUser, setName } from '$lib/stores/user';
	import { pb } from '$lib/services/pocketbase';
	import { goto } from '$app/navigation';
	import ChangeEmailModal from '$lib/components/ChangeEmailModal.svelte';
	import ChangePasswordModal from '$lib/components/ChangePasswordModal.svelte';
	import type { SvelteComponent } from 'svelte';

	function handleNameInputChange() {
		if (name) {
			hasChanged = true;
		} else {
			hasChanged = false;
		}
	}

	function handleSave() {
		setName(name).then(() => {
			name = '';
			hasChanged = false;
		});
	}

	async function handleDelete() {
		const id = pb.authStore.record!.id;
		await pb.collection('users').delete(id);
		pb.authStore.clear()
		goto('/');
	}

	let name = $state('');
	let hasChanged = $state(false);
	let changeEmailModal: SvelteComponent;
	let changePasswordModal: SvelteComponent;
</script>

<ChangeEmailModal bind:this={changeEmailModal} />
<ChangePasswordModal bind:this={changePasswordModal} />

<div class="grid place-items-center">
	<div class="card w-2/4">
		<div class="card-body">
			<h2 class="card-title mb-4 block text-center">Account</h2>
			<div class="join join-vertical">
				<label for="name" class="label font-bold">Name</label>
				<input
					type="text"
					oninput={handleNameInputChange}
					class="input input-bordered w-full"
					placeholder={$currentUser!.name}
					bind:value={name}
				/>
			</div>

			<div class="join join-vertical">
				<label for="email" class="label font-bold">Email</label>
				<span class="mb-2">{$currentUser!.email}</span>
				<button
					onclick={() => {
						changeEmailModal.show();
					}}
					class="btn max-w-xs">Change Email</button
				>
			</div>

			<div class="join join-vertical">
				<label for="change-password" class="label font-bold">Password</label>
				<button
					id="change-password"
					onclick={() => {
						changePasswordModal.show();
					}}
					class="btn max-w-xs">Change Password</button
				>
			</div>
		</div>

		<div class="divider"></div>
		<div class="card-actions justify-between">
			<button onclick={handleDelete} class="btn btn-outline btn-error">Delete Account</button>
			<button onclick={handleSave} class="btn {hasChanged ? 'btn-primary' : 'btn-disabled'}"
				>Save
			</button>
		</div>
	</div>
</div>
