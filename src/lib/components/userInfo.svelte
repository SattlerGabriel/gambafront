<script lang="ts">
	let visible = $state(false);
	let loading = $state(true);
	let user = $state({
		username: '',
		topPayer: { name: '', amount: 0 },
		topPaid: { name: '', amount: 0 },
		totalGold: 0,
		totalRoundsPlayed: ''
	});

	export async function Show(username: string) {
		loading = true;
		visible = true;

		const r = await fetch('https://api.fiumbo.app/user/' + username);
		user = await r.json();
		console.log(user);

		loading = false;
	}

	export function Hide() {
		loading = false;
		visible = false;
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
{#if visible}
	<!-- svelte-ignore a11y_interactive_supports_focus -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div id="user-info" onclick={Hide} role="button">
		{#if !loading}
			<div class="user-container">
				<div class="user-title">
					<h1>{user.username} Stats</h1>
				</div>
				<div class="user-stats">
					<p>Total gold earned: {user.totalGold}<img
							alt="Gold Coin"
							src="https://www.fiumbo.app/gold.png"
							width="16px"
						/></p>
					<p>Total rounds played: {user.totalRoundsPlayed}</p>
					<p>
						Got paid the most from: {user.topPayer.name} ( {user.topPayer.amount}<img
							alt="Gold Coin"
							src="https://www.fiumbo.app/gold.png"
							width="16px"
						/> )
					</p>
					<p>
						Paid the most to: {user.topPaid.name} ( {user.topPaid.amount}<img
							alt="Gold Coin"
							src="https://www.fiumbo.app/gold.png"
							width="16px"
						/> )
					</p>
				</div>
			</div>
		{:else}<p>Loading user info. . .</p>{/if}
	</div>
{/if}

<style lang="scss">
	#user-info {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.75);
		backdrop-filter: blur(5px);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.user-container {
		width: max-content;
		height: max-content;
		box-shadow: 0 0 128px black;
		border: 1px solid #444;
		border-radius: 0.3vw;
		overflow: hidden;
	}

	.user-title {
		background: #222;
		padding: 0.3vw;
	}

	.user-stats {
		background: #000;
		height: 100%;
		padding: 2vw;
	}

	h1 {
		margin: 0;
	}
</style>
