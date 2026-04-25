<script lang="ts">
	const { title = 'New Grid', userList = [] } = $props();
</script>

<div class="container">
	<h1>{title}</h1>
	<div class="table-container">
		<table>
			<thead>
				<tr>
					<th>Ranking</th>
					<th>Username</th>
					<th>Total won</th>
					<th>Rounds Won</th>
					<th>Rounds Lost</th>
					<th>Win%</th>
				</tr>
			</thead>
			<tbody>
				{#each userList as user}
					<tr>
						<td
							class="text-right"
							class:top1={user.ranking == 1}
							class:top2={user.ranking == 2}
							class:top3={user.ranking == 3}
							class:top4={user.ranking == 4}
							class:top5={user.ranking == 5}
							class:others={user.ranking > 5}
							style="width: 0px;"
						>
							{user.ranking}</td
						>
						<td style="max-width: 20%; min-width: 20%">{user.username}</td>
						<td class="text-right" style="width: 4vw;"
							>{user.totalGoldWon}
							<img alt="Gold Coin" src="https://www.fiumbo.app/gold.png" width="16px" /></td
						>
						<td class="text-right" style="max-width: 0px;">{user.totalWon}</td>
						<td class="text-right" style="max-width: 0px;">{user.totalLost}</td>
						<td class="text-right" style="max-width: 15%;"
							>{((user.totalWon / (user.totalWon + user.totalLost)) * 100).toFixed(1)} %</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style lang="scss">
	.container {
		width: 100%;
	}

	.table-container {
		overflow-y: auto;
		max-height: 100%;
	}

	table {
		border: 1px solid #444444;
		border-spacing: 0;
		border-collapse: collapse;
		width: 100%;
	}

	thead {
		position: sticky;
		top: 0;
	}

	thead th {
		background: #222;
	}

	td,
	th {
		border: 1px solid #444444;
		padding: 0 1vw;
	}

	tr:nth-child(odd) {
		background: #000;
	}

	tr:nth-child(even) {
		background: #101010;
	}

	tbody {
		max-height: 10vh;
		overflow-y: hidden;
	}

	tr th:first-child {
		width: 0;
	}

	tr th:first-child {
		width: 0;
	}

	.text-right {
		text-align: right;
	}

	.top1 {
		color: pink;
	}

	.top2 {
		color: orange;
	}

	.top3 {
		color: rgb(205, 0, 205);
	}

	.top4 {
		color: rgb(0, 64, 255);
	}

	.top5 {
		color: rgb(0, 255, 0);
	}

	.others {
		color: gray;
	}
</style>
