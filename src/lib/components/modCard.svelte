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
		label: mod.versions.at(-1),
		value: mod.versions.at(-1),
	};
</script>

<Card.Root class="m-4 clamp">
	<Card.Header>
		<Card.Title>{mod.name}</Card.Title>
		<Card.Description>{mod.description}</Card.Description>
		<Card.Description>
			{#if mod.tags !== undefined && mod.tags !== null}
				{#each mod.tags as tag}
					<Badge variant="outline">{tag.toUpperCase()}</Badge>
				{/each}
			{/if}
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<Label for="version">Version</Label>
		<Select.Root
			{selected}
			onSelectedChange={(v) => {
				v && ((selected.label = v.label), (selected.value = v.value));
			}}
		>
			<Select.Trigger id={`version-${mod.name}`}>
				<Select.Value />
			</Select.Trigger>
			<Select.Content>
				{#each mod.versions as version}
					<Select.Item value={version} label={version}
						>{version}</Select.Item
					>
				{/each}
			</Select.Content>
		</Select.Root>
	</Card.Content>
	<Card.Footer class="flex justify-between">
		<Card.Description>{mod.author}</Card.Description>
		<Popover.Root portal={null}>
			<Popover.Trigger>Install</Popover.Trigger>
			<Popover.Content class="flex space-x-3 size-min">
				<Button
					variant="secondary"
					on:click={() => {
						window.open(
							`/mods/${mod.author}/${mod.name}/${selected.value}?download`,
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
										`/mods/${mod.author}/${mod.name}/${selected.value}?download`,
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
		width: clamp(375px, 645px, 100%);
	}
</style>