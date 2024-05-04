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
	<ul class="flex flex-row items-center [&>*]:p-2">
		<li>
			<a href="/">
				<img class="w-[40px]" src="/favicon.png" alt="logo" />
			</a>
		</li>
		<li><a href="/mods/explore">Mods</a></li>
		<li><a href="/launcher">Launcher</a></li>
		<li><a href="/docs">APIDocs</a></li>
		<li class="ml-auto h-[40]">
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
							<DropdownMenu.Item href={`/mods/${data.username}`}
								>My Mods</DropdownMenu.Item
							>
							<DropdownMenu.Separator />
							<!-- <DropdownMenu.Item>Profile</DropdownMenu.Item> -->
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

<span class="block mb-[70px]" />
<slot />

<footer class="bg-background">
	<div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
		<div class="lg:flex lg:items-start lg:gap-8">
			<div
				class="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16"
			>
				<div class="col-span-2 sm:col-span-1">
					<p class="relative font-medium text-foreground">
						Quick Access
					</p>

					<ul style="list-style:none;" class="mt-6 space-y-4 text-sm">
						<li>
							<a
								href="/"
								class="transition hover:opacity-75 text-foreground"
							>
								Home
							</a>
						</li>

						<li>
							<a
								href="https://github.com/MiMLoader/"
								class="transition hover:opacity-75 text-foreground"
							>
								GitHub
							</a>
						</li>

						<li>
							<a
								href="https://discord.gg/KnT6eBJMuC"
								class="transition hover:opacity-75 text-foreground"
							>
								Discord
							</a>
						</li>
					</ul>
				</div>

				<div class="col-span-2 sm:col-span-1">
					<p class="relative font-medium text-white">Tools</p>

					<ul style="list-style:none;" class="mt-6 space-y-4 text-sm">
						<li>
							<a
								href="https://github.com/mimloader/mimloader"
								class="transition hover:opacity-75 text-foreground"
							>
								Mod Loader
							</a>
						</li>

						<li>
							<a
								href="https://github.com/mimloader/mimlauncher"
								class="transition hover:opacity-75 text-foreground"
							>
								Launcher
							</a>
						</li>

						<li>
							<a
								href="https://github.com/mimloader/devkit"
								class="transition hover:opacity-75 text-foreground"
							>
								DevKit
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="mt-8 border-t pt-8 border-gray-800">
			<div class="sm:flex sm:justify-between">
				<p class="text-xs text-foreground opacity-75">
					© 2024. MiMLoader. All rights reserved.
				</p>

				<ul
					style="list-style:none;"
					class="mt-8 flex flex-wrap justify-start gap-4 text-xs sm:mt-0 lg:justify-end"
				>
					<li>
						<a
							href="/tos"
							class="transition hover:opacity-75 text-foreground"
						>
							Terms & Conditions
						</a>
					</li>

					<li>
						<a
							href="/privacy"
							class="transition hover:opacity-75 text-foreground"
						>
							Privacy Policy
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</footer>
