<script lang="ts">
	import type { DiscordUser } from '$lib/discord';
	import { onMount } from 'svelte';

	let user = $state<DiscordUser | null>(null);

	onMount(async () => {
		const hash = window.location.hash.slice(1); // strip the '#'
		const params = new URLSearchParams(hash);
		const accessToken = params.get('access_token');

		if (!accessToken) return;

		const res = await fetch('https://discord.com/api/users/@me', {
			headers: { Authorization: `Bearer ${accessToken}` }
		});

		const data = await res.json();
		user = {
			id: data.id,
			email: data.email,
			username: data.username,
			nickname: data.global_name,
			avatar: data.avatar
		};
		console.log(data);

		// store it wherever — localStorage, a Svelte store, etc.
		localStorage.setItem('discord_user', JSON.stringify(user));

		window.location.href = 'http://localhost:5173';
	});
</script>
