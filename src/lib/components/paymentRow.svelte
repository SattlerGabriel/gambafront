<script lang="ts">
	const { index = 0, payerName = '', paidName = '', amount = 0, className = '' } = $props();
</script>

<div class={className}>
	<p>
		{index} -
		{payerName} ➡️ {paidName}
		{amount}<img alt="Gold Coin" src="https://www.fiumbo.app/gold.png" width="16px" />
	</p>
</div>

<style lang="scss">
	p {
		margin: 0;
		padding: 0.3vh 0;
		border-bottom: #444 1px solid;
		border-collapse: collapse;
	}

	.paymentRow:nth-child(odd) {
		background: #000;
	}

	.paymentRow:nth-child(even) {
		background: #101010;
	}

	p {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
