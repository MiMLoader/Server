<script lang="ts">
	import {
		Input,
		type FormInputEvent,
	} from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Toaster } from '$lib/components/ui/sonner';
	import { toast } from 'svelte-sonner';
	import ModCard from '$lib/components/modCard.svelte';

	const acceptModJSON = (e: FormInputEvent<Event>) => {
		if (!e.target) throw new Error('Could not get target');

		if (!e.target.files) return toast.error('Upload a mod.json file.');
		if (e.target.files[0].type !== 'application/json')
			return toast.error('Must be a json file');

		const reader = new FileReader();
		reader.addEventListener('load', (e) => {
			const modJsonString = e.target?.result;
			if (!modJsonString) throw new Error("Couldn't read file");
			const modJson = JSON.parse(modJsonString as string);
			console.log(modJson);

			if (typeof modJson.name !== 'string')
				return toast.error("Malformed mod.json. Name is'nt a string");
			if (typeof modJson.description !== 'string')
				return toast.error(
					"Malformed mod.json. Description is'nt a string",
				);
			if (typeof modJson.homepage !== 'string')
				return toast.error(
					"Malformed mod.json. Homepage is'nt a string",
				);
			if (typeof modJson.main !== 'string')
				return toast.error("Malformed mod.json. Main is'nt a string");
			if (
				typeof modJson.preload !== 'string' &&
				modJson.preload !== false
			)
				return toast.error(
					"Malformed mod.json. Preload is'nt a string or set to false",
				);
			if (typeof modJson.priority !== 'number')
				return toast.error(
					"Malformed mod.json. Priority is'nt a number",
				);
		});
		reader.readAsText(e.target.files[0]);
	};
</script>

<div class="grid w-full max-w-sm items-center gap-1.5">
	<Label for="modJSON">Mod Json</Label>
	<Input on:change={acceptModJSON} id="modJSON" type="file" accept=".json" />
</div>

<div>
	<Label for="cardPreview">Card Preview</Label>
	<ModCard mod={modJson}/>
</div>

<Toaster />
