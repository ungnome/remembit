<script lang="ts">
	import { currentUser } from '$lib/stores/user';

	function handleNameInputChange() {
		if (name) {
			hasChanged = true;
		} else {
			hasChanged = false;
		}
	}

	let name = $state('');
	let hasChanged = $state(false);
	let saveButtonColor = $derived(hasChanged ? 'btn-primary' : 'btn-disabled');

	$inspect(hasChanged);
</script>

<div class="grid place-items-center">
	<div class="card w-2/4">
		<div class="card-body">
			<h2 class="card-title mb-4 block text-center">Account</h2>
			<form id="user-profile" action="" class="flex flex-col">
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
			</form>

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
			<button
				type="submit"
				form="user-profile"
				class="btn btn-outline btn-error"
				value="Delete Account">Delete Account</button
			>
			<input type="submit" form="user-profile" class="btn {hasChanged ? 'btn-primary' : 'btn-disabled'}" value="Save" />
		</div>
	</div>
</div>
