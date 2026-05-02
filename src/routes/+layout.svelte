<script lang="ts">
	import favicon from '$lib/assets/favicon.png';

	let { children } = $props();
	import { globalState } from './page.svelte.ts';
	import GuildView from '$lib/components/guildView.svelte';
	import { getDiscordAuthUrl, type DiscordUser } from '$lib/discord';
	import { onMount } from 'svelte';
	import { PUBLIC_API_URL } from '$env/static/public';

	let guildList: any = $state([{ name: 'Life on Cooldown' }, { name: 'Phoenix Protocol' }]);
	let input = $state('');

	onMount(() => {
		const data = localStorage.getItem('discord_user');
		if (!!data) {
			const user = JSON.parse(data) as DiscordUser | null;
			globalState.login(user);
			console.log(globalState.user);
		} else {
			globalState.login(null);
		}
	});

	const searchGuilds = async () => {
		const res = await fetch(PUBLIC_API_URL + 'guilds/all/' + input);

		guildList = await res.json();
		globalState.selectGuild(null);
	};
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div id="body">
	<nav>
		<form class="navForm">
			<input
				bind:value={input}
				placeholder="Search a guild name..."
				type="text"
				class="searchBar"
			/>
			<button type="submit" onclick={() => searchGuilds()}>Search!</button>
		</form>
		<p class="title">World of Gambacraft</p>
		{#if !!globalState.user}
			<div class="userInfo">
				<p>{globalState.user.nickname}</p>
				<img
					class="avatar"
					src="https://cdn.discordapp.com/avatars/{globalState.user.id}/{globalState.user.avatar}"
					alt="Profile picture for {globalState.user.nickname}"
				/>
			</div>
		{:else}
			<div class="userInfo">
				<button onclick={() => (window.location.href = getDiscordAuthUrl())}
					>Log in with Discord</button
				>
			</div>
		{/if}
	</nav>

	{@render children()}
</div>

<style lang="less">
	h1,
	p {
		margin: 0;
		padding: 0;
	}

	#body {
		height: 100vh;
		width: 100%;
		color: white;
		background: #000;
		overflow-y: auto;
	}

	nav {
		position: relative;
		width: 100%;
		height: 5vh;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #444;
	}

	.searchBar {
		background: none;
		border: 1px solid white;
		margin: 1vh;
		color: white;
		padding: 1vh;

		&::placeholder {
			color: #aaa;
			text-align: center;
		}
	}

	.userInfo {
		height: 100%;
		display: flex;
		align-items: center;
	}

	.avatar {
		border-radius: 100%;
		width: 4.5vh;
	}

	button {
		background: none;
		border: 1px solid white;
		border-radius: 2vw;
		width: 10vw;
		height: 4vh;
		color: white;
		cursor: pointer;
	}

	.nonguild {
		width: 100%;
		height: calc(100% - 5.5vh);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.search {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 3vh 0;
	}

	.navForm {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.title {
		font-size: 2rem;
		position: absolute;
		top: 0;
		left: calc(50% - 2rem * 4.5);
	}

	.guildList {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		overflow-y: auto;
		height: calc(100% - 5.5vh);

		h1 {
			margin-bottom: 2vh;
		}

		button {
			margin: 1vh 0;
		}
	}
</style>
