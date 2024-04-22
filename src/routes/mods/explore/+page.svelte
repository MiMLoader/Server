<script lang="ts">
	import ModCard from '$lib/components/modCard.svelte';
	import ModCardSkeleton from '$lib/components/modCardSkeleton.svelte';
	import type { Mod } from '../../../app';
	import { onMount } from 'svelte';

	let modListPromiseResolve: (value: Mod[]) => void;
	const modListPromise: Promise<Mod[]> = new Promise((resolve) => {
		modListPromiseResolve = resolve;
	});

	onMount(() => {
		fetch('modList')
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				modListPromiseResolve(res);
			});
	});
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>Explore Mods | MiML</title>
	<meta name="title" content="Explore Mods | MiML" />
	<meta name="description" content="Explore Moonstone Island Mods" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://mimloader.com/mods" />
	<meta property="og:title" content="Explore Mods | MiML" />
	<meta property="og:description" content="Explore Moonstone Island Mods" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://mimloader.com/mods" />
	<meta property="twitter:title" content="Explore Mods | MiML" />
	<meta
		property="twitter:description"
		content="Explore Moonstone Island Mods"
	/>

	<!-- Meta Tags Generated with https://metatags.io -->
</svelte:head>

<div class="flex flex-wrap items-center justify-center">
	{#await modListPromise}
		{#each [1, 1, 1, 1, 1, 1] as num }
			<ModCardSkeleton />
		{/each}
	{:then modList}
		{#each modList as mod}
			<ModCard {mod} />
		{/each}
	{/await}
</div>
