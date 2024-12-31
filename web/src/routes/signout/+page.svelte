<script lang="ts">
	import { pb } from '$lib/services/pocketbase';

	pb.authStore.clear();
</script>

<div class="flex place-content-center">
	<p>You have been signed out</p>
</div>
