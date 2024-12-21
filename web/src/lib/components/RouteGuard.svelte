<script lang="ts">
	import { pb } from '$lib/services/pocketbase';
	import { goto } from '$app/navigation';

	let isSignedIn = pb.authStore.isValid;
	console.log(pb.authStore);

	if (!isSignedIn) {
		goto('/signin');
	}
</script>

{#if isSignedIn}
	<slot />
{/if}
