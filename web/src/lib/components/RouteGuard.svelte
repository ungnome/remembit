<script lang="ts">
	import { goto } from '$app/navigation';
	import user from '$lib/stores/user.svelte';

	let { children } = $props();

	if (!user.isValid) {
		goto('/signin');
	}
</script>

{#if user.isValid}
	{@render children?.()}
{/if}
