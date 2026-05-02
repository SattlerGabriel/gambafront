import { PUBLIC_API_URL } from '$env/static/public';

// src/lib/discord.ts
const DISCORD_CLIENT_ID = '1498773918260006982';
const REDIRECT_URI = PUBLIC_API_URL + 'callback';

export function getDiscordAuthUrl() {
	const params = new URLSearchParams({
		client_id: DISCORD_CLIENT_ID,
		redirect_uri: REDIRECT_URI,
		response_type: 'token', // <-- implicit flow
		scope: 'identify email'
	});
	return `https://discord.com/oauth2/authorize?${params}`;
}

export type DiscordUser = {
	id: string;
	username: string;
	nickname: string;
	email: string;
	avatar: string;
};
