<script lang="ts">
	import { pb } from '$lib/services/pocketbase';
	import { goto } from '$app/navigation';

	let isSignedIn = pb.authStore.isValid;
	let { children } = $props();

	if (!isSignedIn) {
		goto('/signin');
	}
</script>

{#if isSignedIn}
	{@render children?.()}
{/if}
