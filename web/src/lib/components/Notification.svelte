<script lang="ts">
	import ErrorIcon from '$lib/icons/alert-circle.svelte';
	import WarningIcon from '$lib/icons/alert-triangle.svelte';
	import SuccessIcon from '$lib/icons/check-circle.svelte';
	import InfoIcon from '$lib/icons/info.svelte';

	export let notificationType: 'info' | 'success' | 'warning' | 'error' = 'info';
</script>

<div class="toast toast-center toast-bottom z-50">
	<div role="alert" class="alert alert-warning">
		{#if notificationType === 'info'}
			<InfoIcon />
		{:else if notificationType === 'success'}
			<SuccessIcon />
		{:else if notificationType === 'warning'}
			<WarningIcon />
		{:else}
			<ErrorIcon />
		{/if}
		<span>
			<slot>Placeholder Notification.</slot>
		</span>
	</div>
</div>
