<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
</script>

<Button href="/docs" aria-current={$page.url.pathname === '/docs'}
	>To Docs</Button
>
