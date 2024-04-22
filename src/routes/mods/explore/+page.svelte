<script lang="ts">
	import ModCard from '$lib/components/modCard.svelte';
	import type { Mod } from '../../../app';
	const mod: Mod = {
		author: 'Ahhh_Saturn',
		name: 'mimlAPI',
		description:
			'An API to make modding with Moonstone Island Mod Loader easier.',
		versions: ['1.0.0', '1.0.1', '1.0.2'],
		tags: ['api', 'other'],
	};
</script>

<ModCard {mod}/>
