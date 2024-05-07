<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import {
		Input,
		type FormInputEvent,
	} from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Toaster } from '$lib/components/ui/sonner';
	import { toast } from 'svelte-sonner';
	import ModCard from '$lib/components/modCard.svelte';
	import ModCardSkeleton from '$lib/components/modCardSkeleton.svelte';
	import type { Mod } from '../../app';

	$: tab = 'info';

	let isModJsonResolved = false;
	let modJsonPromiseResolve: (value: Mod) => void;
	const modJsonPromise: Promise<Mod> = new Promise((resolve) => {
		modJsonPromiseResolve = resolve;
	});
	modJsonPromise.then((e) => {
		isModJsonResolved = true;
		return e;
	});

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

			modJson.Versions = [modJson.version];
			modJsonPromiseResolve(modJson);
		});
		reader.readAsText(e.target.files[0]);
	};

	let isModZipResolved = false;
	let modZipPromiseResolve: (value: ArrayBuffer) => void;
	const modZipPromise: Promise<ArrayBuffer> = new Promise((resolve) => {
		modZipPromiseResolve = resolve;
	});
	modZipPromise.then((e) => {
		isModZipResolved = true;
		return e;
	});

	const acceptModZip = (e: FormInputEvent<Event>) => {
		if (!e.target) throw new Error('Could not get target');

		if (!e.target.files) return toast.error('Upload a zip file.');
		if (e.target.files[0].type !== 'application/zip')
			return toast.error('Must be a zip file');

		modZipPromiseResolve(e.target.files[0]);
	};

	const uploadMod = async () => {
		if (!isModJsonResolved) return toast.error('mod.json has problems');
		if (!isModZipResolved) return toast.error('mod zip has problems');

		const data = new FormData();
		data.append('modJson', JSON.stringify(await modJsonPromise));
		data.append('modZip', (await modZipPromise));

		fetch('/upload', {
			method: 'POST',
			body: data,
		}).then((response) => {
			if (response.status !== 200)
				return toast.error('Something went wrong when loading mod.');
		});
	};
</script>

<Tabs.Root value={tab} class="w-100 p-2">
	<Tabs.List class="grid w-full grid-cols-2">
		<Tabs.Trigger value="info">Info</Tabs.Trigger>
		<Tabs.Trigger value="assets">Assets</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="info">
		<Card.Root>
			<Card.Content>
				<div class="grid w-full max-w-sm items-center gap-1.5 m-4">
					<Label for="modJSON">Mod Json</Label>
					<Input
						on:change={acceptModJSON}
						id="modJSON"
						type="file"
						accept=".json"
					/>
				</div>

				<div>
					<Label class="m-4">Mod Preview</Label>
					{#await modJsonPromise}
						<ModCardSkeleton />
					{:then modJson}
						<ModCard mod={modJson} disabled={true} />
					{/await}
				</div>
			</Card.Content>
			<Card.Footer class="justify-end">
				<Button
					on:click={(e) => {
						e.preventDefault();
						tab = 'assets';
					}}>Next</Button
				>
			</Card.Footer>
		</Card.Root>
	</Tabs.Content>
	<Tabs.Content value="assets">
		<Card.Root>
			<Card.Content>
				<div class="grid w-full max-w-sm items-center gap-1.5 m-4">
					<Label for="modZip">Mod Zip</Label>
					<Input
						on:change={acceptModZip}
						id="modZip"
						type="file"
						accept=".zip"
					/>
				</div>
			</Card.Content>
			<Card.Footer class="justify-between">
				<Button
					on:click={() => {
						tab = 'info';
					}}>Back</Button
				>
				<Button on:click={uploadMod}>Upload</Button>
			</Card.Footer>
		</Card.Root>
	</Tabs.Content>
</Tabs.Root>

<Toaster />
