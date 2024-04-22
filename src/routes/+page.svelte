<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>Moonstone Island Mod Loader</title>
	<meta name="title" content="Moonstone Island Mod Loader" />
	<meta
		name="description"
		content="Fly through the clouds, battle tough opponents, and make new friends - with the help of the Moonstone Island Mod Loader, the sky isn't even the limit! Customize your playthrough to your liking with the help of user created mods."
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://mimloader.com/" />
	<meta property="og:title" content="Moonstone Island Mod Loader" />
	<meta
		property="og:description"
		content="Fly through the clouds, battle tough opponents, and make new friends - with the help of the Moonstone Island Mod Loader, the sky isn't even the limit! Customize your playthrough to your liking with the help of user created mods."
	/>

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://mimloader.com/" />
	<meta property="twitter:title" content="Moonstone Island Mod Loader" />
	<meta
		property="twitter:description"
		content="Fly through the clouds, battle tough opponents, and make new friends - with the help of the Moonstone Island Mod Loader, the sky isn't even the limit! Customize your playthrough to your liking with the help of user created mods."
	/>

	<!-- Meta Tags Generated with https://metatags.io -->
</svelte:head>

<Button href="/docs" aria-current={$page.url.pathname === '/docs'}
	>To Docs</Button
>
