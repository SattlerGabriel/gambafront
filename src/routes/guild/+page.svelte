<script lang="ts">
	import GuildView from '$lib/components/guildView.svelte';
	import { page } from '$app/state';

	const guildName = $derived(page.url.searchParams.get('guildName'));
	console.log(guildName);
</script>

	{#if !!guildName}
		<GuildView {guildName} />
	{:else}{/if}

<style lang="scss">
	h1,
	p {
		margin: 0;
		padding: 0;
	}
</style>
