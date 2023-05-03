<script>
	// @ts-nocheck
	import { createQuery } from '@tanstack/svelte-query';
	import { fly } from 'svelte/transition';
	import { userPublicKey } from '../../lib/stores.ts';
	import '../../app.css';
	import { getPrice } from '$lib/api/solana/getPrice.ts';
	import { getBalance } from '$lib/api/solana/getBalance.ts';

	const balanceQuery = createQuery({
		queryKey: ['balance'],
		queryFn: getBalance
	});
</script>
<div class="balance-ticker">
	<h4>Solana Balance - {$balanceQuery.data} SOL</h4>
	{#if $balanceQuery.isIdle}
		<h4>Sol Balance - ...</h4>
	{:else if $balanceQuery.isLoading}
		<h4>Loading Balance - ...</h4>
	{:else if $balanceQuery.isError}
		<h4 class="m-auto">error fetching token balance</h4>
	{/if}
</div>

<style>
	h4 {
		text-align: left;
		position: relative;
		left: 20px;
		top: 10px;
		width: 400px;
		display: flex;
		flex-direction: row;
		position: relative;
		top: 20px;
	}
</style>
