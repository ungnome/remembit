<script lang="ts">
	import user from '$lib/stores/user.svelte';
	import { goto } from '$app/navigation';

	if (user.isValid) {
		goto('/bookmarks');
	}
</script>

<h1>Welcome to SvelteKit placeholder for remembit!</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
