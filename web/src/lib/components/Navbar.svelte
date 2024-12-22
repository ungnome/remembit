<script lang="ts">
	import { currentUser } from '$lib/stores/user';
	let user = $currentUser;
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a class="btn btn-ghost text-xl" href="/">remembit</a>
	</div>

	{#if user}
		<div class="flex-none gap-2">
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="avatar btn btn-circle btn-ghost">
					<div class="w-10 rounded-full">
						<img
							alt="Tailwind CSS Navbar component"
							src="https://gravatar.com/avatar/qweopiruqpoiuqeri"
						/>
					</div>
				</div>
				<ul
					class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
				>
					<li><a href="/signout">Sign Out</a></li>
				</ul>
			</div>
		</div>
	{/if}
</div>
