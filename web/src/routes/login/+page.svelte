<script lang="ts">
	import UserIcon from '$lib/icons/user.svelte';
	import KeyIcon from '$lib/icons/key.svelte';
	import { pb } from '$lib/pocketbase';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';

	async function signIn() {
		await pb.collection('users').authWithPassword(email, password);
		goto('/bookmarks');
	}
</script>

<div class="grid place-items-center">
	<div class="card card-bordered w-96 shadow-xl">
		<div class="card-body">
			<h2 class="card-title mb-4 block text-center">Remembit</h2>
			<form id="signin" on:submit|preventDefault={signIn} class="flex flex-col" action="">
				<label class="input input-bordered mb-2 flex items-center gap-2">
					<UserIcon class="h-4 w-4 opacity-70" />
					<input bind:value={email} type="email" placeholder="Email Address" />
				</label>

				<label class="input input-bordered mb-2 flex items-center gap-2">
					<KeyIcon class="h-4 w-4 opacity-70" />
					<input bind:value={password} class="grow" type="password" placeholder="Password" />
				</label>
			</form>
			<div class="card-actions">
				<input form="signin" type="submit" class="btn btn-block" value="Sign-In" />
			</div>
		</div>
	</div>
</div>
