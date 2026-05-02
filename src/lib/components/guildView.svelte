<script lang="ts">
	import type { User } from '$lib/models/user';
	import { onMount } from 'svelte';
	import Grid from './grid.svelte';
	import type { Payment } from '$lib/models/payment';
	import PaymentRow from '$lib/components/paymentRow.svelte';
	import UserInfo from '$lib/components/userInfo.svelte';
	import { PUBLIC_API_URL } from '$env/static/public';
	import type { Guild } from '$lib/models/guild';

	let { guildName } = $props();

	const paymentCap = 25;
	let loading = $state(false);
	let guild: Guild | null = $state(null);
	let userList: User[] = $state([]);
	let topLosers: User[] = $state([]);
	let topWinners: User[] = $state([]);
	let payments: Payment[] = $state([]);

	onMount(async () => {
		loading = true;
		const res = await fetch(PUBLIC_API_URL + 'guildStats/' + guildName);
		const body = await res.json();
		guild = body as Guild;
		let paymentCount = 0;
		guild.round.forEach((round) => {
			if (paymentCount > paymentCap) return;
			if (round.payments.length > 0) payments.push(round.payments[0]);
			paymentCount++;
		});
		payments.forEach((payment) => {
			const winner = payment.receiver;
			const loser = payment.sender;
			const parsedWinner: User = {
				id: winner.id,
				username: winner.username,
				totalGoldWon: payment.amount,
				totalWon: 1,
				totalLost: 0
			};
			const parsedLoser: User = {
				id: loser.id,
				username: loser.username,
				totalGoldWon: -payment.amount,
				totalWon: 0,
				totalLost: 1
			};

			const foundWinner: User | undefined = userList.find((u) => u.username === winner.username);
			const foundLoser: User | undefined = userList.find((u) => u.username === loser.username);
			if (!!foundWinner) {
				foundWinner.totalGoldWon += payment.amount;
				foundWinner.totalWon++;
			} else userList.push(parsedWinner);
			if (!!foundLoser) {
				foundLoser.totalGoldWon -= payment.amount;
				foundLoser.totalLost++;
			} else userList.push(parsedLoser);
		});
		userList = userList.sort((a: User, b: User) => b.totalGoldWon - a.totalGoldWon);
		topWinners = [...userList].splice(0, 5);
		topLosers = [...userList].sort((a, b) => a.totalGoldWon - b.totalGoldWon).splice(0, 5);

		loading = false;
	});

	const showUserInfo = (username: string) => {
		modal.Show(username);
	};

	let modal: UserInfo;
</script>

<div id="body">
	<div id="title">
		<h1>[{guild?.name}]</h1>
	</div>
	{#if loading}
		<p>Loading Data</p>
	{:else}
		<div class="flex">
			<div class="tall-col">
				<div class="payments">
					<h1>Latest payments</h1>
					{#each payments as payment, i}
						<PaymentRow
							className="paymentRow"
							payerName={payment.sender.username}
							paidName={payment.receiver.username}
							amount={payment.amount}
							index={i + 1}
						/>
					{/each}
				</div>
			</div>
			<div class="duo-col">
				<div class="losers">
					<Grid title="Top Losers" userList={topLosers} onClickUser={showUserInfo} />
				</div>
				<div class="winners">
					<Grid title="Top Winners" userList={topWinners} onClickUser={showUserInfo} />
				</div>
			</div>
			<div class="tall-col">
				<div class="allUsers">
					<Grid title="All Gamblers" {userList} onClickUser={showUserInfo} />
				</div>
			</div>
		</div>
	{/if}
	<UserInfo bind:this={modal} />
	<footer>Brought to you by a cunt named Boombah!</footer>
</div>

<style lang="scss">
	h1 {
		margin: 0;
	}

	p {
		margin: 0;
	}

	#title {
		width: 100%;
		text-align: center;
		font-size: 2vw;
		height: 6vh;
	}

	.flex {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		flex-direction: row;
		height: calc(100% - 10vh);
		width: 100%;
	}

	.left {
		padding-top: 10vh;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	}

	.right {
		padding-top: 10vh;
		height: 100%;
		display: flex;
		align-items: start;
		flex-direction: column;
	}

	.payments {
		width: 100%;
		border: 1px #444 solid;
		border-bottom: none;

		& h1 {
			text-align: center;
			padding: 0.25vw 2vw;
			background: #222;
			border-bottom: 1px solid #444;
		}
	}

	footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		text-align: center;
	}
</style>
