<script lang="ts">
	import { page } from '$app/stores';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Toaster } from '$lib/components/ui/sonner';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import '../app.pcss';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	onMount(() => {
		switch ($page.url.searchParams.get('referer')) {
			case '/auth/logout':
				toast.success('You are logged out.');
				break;
			default:
				break;
		}
	});
</script>

<nav
	class="border-b bg-background text-foreground shadow-lg fixed top-0 w-full"
>
	<ul class="flex flex-row">
		<li class="ml-auto">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Avatar.Root>
						{#if data.bearer !== undefined}
							<Avatar.Image
								src={data.avatar}
								alt={`@${data.username}`}
							/>
							<Avatar.Fallback
								>{data.username?.slice(0, 2)}</Avatar.Fallback
							>
						{:else}
							<Avatar.Image
								src="/person.svg"
								alt="logged out profile"
							/>
							<Avatar.Fallback>PR</Avatar.Fallback>
						{/if}
					</Avatar.Root>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Label>Account</DropdownMenu.Label>
						<DropdownMenu.Separator />
						{#if data.bearer !== undefined}
							<DropdownMenu.Item>Mods</DropdownMenu.Item>
							<DropdownMenu.Separator />
							<DropdownMenu.Item>Profile</DropdownMenu.Item>
							<DropdownMenu.Item href="/auth/logout"
								>Logout</DropdownMenu.Item
							>
						{:else}
							<DropdownMenu.Item href="/auth"
								>Login</DropdownMenu.Item
							>
						{/if}
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</li>
	</ul>
</nav>

<Toaster />

<span class="block mb-[50px]" />
<slot />
