<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { Mod } from '../../../app';

	let modListPromiseResolve: (value: Mod[]) => void;
	const modListPromise: Promise<Mod[]> = new Promise((resolve) => {
		modListPromiseResolve = resolve;
	});

	onMount(() => {
		const author = $page.url.pathname.split('/')[2].toLowerCase();
		fetch(
			`https://modcdn-worker.astraeffect.workers.dev/api/mods/${author}`,
		)
			.then(async (res) => {
				return await res.json();
			})
			.then((modList: Mod[]) => {
				modListPromiseResolve(modList);
			});
	});
</script>

<p>This page is still being developed, sorry for the inconvenience</p>

{#await modListPromise}
	<p>loading raw list</p>
{:then modList}
	<p>raw list:</p>
	<p>{JSON.stringify(modList)}</p>
{/await}
