<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Popover from '$lib/components/ui/popover';
	import * as Select from '$lib/components/ui/select/index.js';
	import type { Mod } from '../../app';

	export let mod: Mod;

	const selected = {
		label: mod.Versions.at(-1),
		value: mod.Versions.at(-1),
	};
</script>

<Card.Root class="m-4 clamp">
	<Card.Header>
		<Card.Title class="flex justify-between items-center">
			<span>{mod.Name}</span>
			<Card.Description>{mod.Author}</Card.Description>
		</Card.Title>
		<Card.Description>{mod.Description}</Card.Description>
		<Card.Description>
			{#if mod.Tags !== undefined && mod.Tags !== null}
				{#each mod.Tags as tag}
					<Badge variant="outline">{tag.toUpperCase()}</Badge>
				{/each}
			{/if}
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<Label for={`version-${mod.Author}-${mod.Name}`}>Version</Label>
		<Select.Root
			{selected}
			onSelectedChange={(v) => {
				v && ((selected.label = v.label), (selected.value = v.value));
			}}
		>
			<Select.Trigger id={`version-${mod.Author}-${mod.Name}`}>
				<Select.Value />
			</Select.Trigger>
			<Select.Content>
				{#each mod.Versions as version}
					<Select.Item value={version} label={version}
						>{version}</Select.Item
					>
				{/each}
			</Select.Content>
		</Select.Root>
	</Card.Content>
	<Card.Footer class="flex justify-between">
		<Button
			variant="secondary"
			href={`/mods/${mod.Author.toLowerCase()}/${mod.Name.toLowerCase()}?version=${selected.value}`}
			>View</Button
		>
		<Popover.Root portal={null}>
			<Popover.Trigger>
				<Button>Install</Button>
			</Popover.Trigger>
			<Popover.Content class="flex space-x-3 size-min">
				<Button
					variant="secondary"
					on:click={() => {
						window.open(
							`/mods/${mod.Author.toLowerCase()}/${mod.Name.toLowerCase()}/download?version=${selected.value}`,
						);
					}}>Manual</Button
				>
				<AlertDialog.Root>
					<AlertDialog.Trigger asChild let:builder>
						<Button builders={[builder]}>MiMLauncher Install</Button
						>
					</AlertDialog.Trigger>
					<AlertDialog.Content>
						<AlertDialog.Header>
							<AlertDialog.Title>Not yet!</AlertDialog.Title>
							<AlertDialog.Description>
								Installing like this isn't ready <i>just</i> yet.
								For now use manual install.
							</AlertDialog.Description>
						</AlertDialog.Header>
						<AlertDialog.Footer>
							<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
							<AlertDialog.Action
								on:click={() => {
									window.open(
										`/mods/${mod.Author}/${mod.Name}/download?version=${selected.value}`,
									);
								}}>Manual Install</AlertDialog.Action
							>
						</AlertDialog.Footer>
					</AlertDialog.Content>
				</AlertDialog.Root>
			</Popover.Content>
		</Popover.Root>
	</Card.Footer>
</Card.Root>

<style>
	:global(.clamp) {
		width: clamp(345px, 400px, 400px);
	}
</style>
