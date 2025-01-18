<script lang="ts">
	import ErrorIcon from '$lib/icons/alert-circle.svelte';
	import WarningIcon from '$lib/icons/alert-triangle.svelte';
	import SuccessIcon from '$lib/icons/check-circle.svelte';
	import InfoIcon from '$lib/icons/info.svelte';

	type Props = {
		message: string;
		type: 'info' | 'success' | 'warning' | 'error';
	};

	let { message, type }: Props = $props();
</script>

<div class="daisyui-toast daisyui-toast-center daisyui-toast-bottom z-50">
	<div role="alert" class="daisyui-alert daisyui-alert-warning">
		{#if type === 'info'}
			<InfoIcon />
		{:else if type === 'success'}
			<SuccessIcon />
		{:else if type === 'warning'}
			<WarningIcon />
		{:else}
			<ErrorIcon />
		{/if}
		<span>
			{message}
		</span>
	</div>
</div>
