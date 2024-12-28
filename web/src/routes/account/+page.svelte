<script lang="ts">
	import { currentUser, setName } from '$lib/stores/user';

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

	let name = $state('');
	let hasChanged = $state(false);
	$inspect(name);
</script>

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
				<button class="btn max-w-xs">Change Email</button>
			</div>

			<div class="join join-vertical">
				<label for="change-password" class="label font-bold">Password</label>
				<button id="change-password" class="btn max-w-xs">Change Password</button>
			</div>
		</div>

		<div class="divider"></div>
		<div class="card-actions justify-between">
			<button class="btn btn-outline btn-error" value="Delete Account">Delete Account</button>
			<button onclick={handleSave} class="btn {hasChanged ? 'btn-primary' : 'btn-disabled'}"
				>Save
			</button>
		</div>
	</div>
</div>
