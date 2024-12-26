<script lang="ts">
	import { currentUser } from '$lib/stores/user';
	import { goto } from '$app/navigation';

	if ($currentUser) {
		goto('/bookmarks')
	}
</script>

<h1>Welcome to SvelteKit placeholder for remembit!</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
