<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Skeleton } from '$lib/components/ui/skeleton';
</script>

<Card.Root class="m-4 clamp">
	<Card.Header>
		<Card.Title>
			<Skeleton class="h-5 w-20" />
		</Card.Title>
		<Skeleton class="h-[19px] w-100" />
		<Skeleton class="h-[19px] w-60 rounded-full" />
	</Card.Header>
	<Card.Content>
		<Label for="version">
			<Skeleton class="h-[18px] w-[55px] mb-1" />
		</Label>
		<Skeleton id="version" class="h-[35px] w-100" />
	</Card.Content>
	<Card.Footer class="flex justify-between">
		<Skeleton class="h-[18px] w-20" />
		<Skeleton class="h-[25px] w-20" />
	</Card.Footer>
</Card.Root>

<style>
	:global(.clamp) {
		width: clamp(345px, 400px, 400px);
	}
</style>
