<script lang="ts">
	import type { User } from '$lib/models/user';
	import { onMount } from 'svelte';
	import Grid from '../lib/components/grid.svelte';
	import type { Payment } from '$lib/models/payment';
	import PaymentRow from '$lib/components/paymentRow.svelte';
	import UserInfo from '$lib/components/userInfo.svelte';
	let loading = $state(false);
	let userList: User[] = $state([]);
	let topLosers: User[] = $state([]);
	let topWinners: User[] = $state([]);
	let payments: Payment[] = $state([]);

	onMount(async () => {
		loading = true;
		const res = await fetch('https://api.fiumbo.app/globalStats');
		const body = (await res.json()) as User[];
		userList = body.sort((a, b) => b.totalGoldWon - a.totalGoldWon);
		for (let i = 0; i < userList.length; i++) {
			userList[i].ranking = i + 1;
		}
		topWinners = [...userList].splice(0, 5);
		topLosers = [...userList].sort((a, b) => a.totalGoldWon - b.totalGoldWon).splice(0, 5);

		const paymentRes = await fetch('https://api.fiumbo.app/payments/latest');
		payments = (await paymentRes.json()) as Payment[];
		if (payments.length > 21) {
			payments.splice(0, 10);
		}

		loading = false;
	});

	const showUserInfo = (username: string) => {
		modal.Show(username);
	};

	let modal: UserInfo;
</script>

<div id="body">
	<div id="title">
		<h1>Gamblelogs</h1>
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
							payerName={payment.payerName}
							paidName={payment.paidName}
							amount={payment.amount}
							index={i + 1}
						/>
					{/each}
				</div>
			</div>
			<div class="duo-col">
				<div class="losers">
					<Grid title="Top 5 Losers" userList={topLosers} onClickUser={showUserInfo} />
				</div>
				<div class="winners">
					<Grid title="Top 5 Winners" userList={topWinners} onClickUser={showUserInfo} />
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

	#body {
		height: 100vh;
		width: 100%;
		color: white;
		background: #000;
		overflow-y: auto;
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
