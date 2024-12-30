<script>
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import NavBarBottom from '$lib/components/NavBarBottom.svelte';
	let { children } = $props();
</script>

<Navbar />
<NavBarBottom />

{@render children?.()}
