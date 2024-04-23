<script lang="ts">
	import '../app.pcss';
	import { page } from '$app/stores';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	const login = () => {
		console.log('login attempt');
	};
</script>

<nav
	class="border-b bg-background text-foreground shadow-lg fixed top-0 w-full"
>
	<ul class="flex flex-row">
		<li class="ml-auto">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Avatar.Root>
						<Avatar.Image
							src="/person.svg"
							alt="logged out profile"
						/>
						<Avatar.Fallback>PR</Avatar.Fallback>
					</Avatar.Root>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Label>Account</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item on:click={login}
							>Login</DropdownMenu.Item
						>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</li>
	</ul>
</nav>

<span class="block mb-10" />
<slot />
