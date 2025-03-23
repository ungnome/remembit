<script lang="ts">
  import { pb } from '$lib/services/pocketbase';
  import bookmarks from '$lib/stores/bookmarks.svelte';
  import user from '$lib/stores/user.svelte';

  pb.authStore.clear();
  user.reset();
  bookmarks.reset();
</script>

<div class="flex place-content-center">
  <p>You have been signed out</p>
</div>
