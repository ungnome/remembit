<script lang="ts">
	import { currentUser } from '$lib/stores/user';
	import { pb } from '$lib/services/pocketbase';
	import { goto } from '$app/navigation';
	import ChangeEmailModal from '$lib/components/ChangeEmailModal.svelte';
	import ChangePasswordModal from '$lib/components/ChangePasswordModal.svelte';
	import type { SvelteComponent } from 'svelte';

	async function handleSave() {
		const id = $currentUser!.id;

		await pb.collection('users').update(id, { name: name });
		reset();
	}

	async function handleDelete() {
		const id = $currentUser!.id;

		await pb.collection('users').delete(id);
		pb.authStore.clear();
		goto('/');
	}

	function reset() {
		name = '';
	}

	let name = $state('');
	let hasChanged = $derived.by(() => (name.length > 0 ? true : false));
	let changeEmailModal: SvelteComponent;
	let changePasswordModal: SvelteComponent;
</script>

<ChangeEmailModal bind:this={changeEmailModal} />
<ChangePasswordModal bind:this={changePasswordModal} />

<div class="mx-4 grid place-items-center sm:mx-0 space-y-96">
	<div class="grid w-full sm:w-[35rem]">
		<h2 class="justify-self-center text-xl font-bold">Account</h2>

		<label for="name" class="label font-bold">Name</label>
		<input
			type="text"
			class="input input-bordered"
			placeholder={$currentUser!.name}
			bind:value={name}
		/>

		<label for="email" class="label font-bold">Email</label>
		<span class="mb-2">{$currentUser!.email}</span>
		<button
			onclick={() => {
				changeEmailModal.show();
			}}
			class="btn max-w-xs">Change Email</button
		>

		<label for="change-password" class="label font-bold">Password</label>
		<button
			id="change-password"
			onclick={() => {
				changePasswordModal.show();
			}}
			class="btn max-w-xs">Change Password</button
		>

		<div class="divider"></div>

		<div class="flex justify-between">
			<button onclick={handleDelete} class="btn btn-outline btn-error">Delete Account</button>
			<button onclick={handleSave} class="btn {hasChanged ? 'btn-primary' : 'btn-disabled'}"
				>Save
			</button>
		</div>
	</div>
	<button class="sm:hidden btn btn-primary btn-wide">Sign-Out</button>
</div>
