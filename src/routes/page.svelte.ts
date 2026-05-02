import type { DiscordUser } from '$lib/discord';

class GlobalState {
	user: DiscordUser | null = $state(null);
	guild: any = $state(null);

	login(user: DiscordUser | null) {
		this.user = user;
	}

	logout() {
		this.user = null;
	}

	selectGuild(guild: any) {
		this.guild = guild;
		localStorage.setItem('guild', JSON.stringify(guild));
	}
}

export const globalState = new GlobalState();
