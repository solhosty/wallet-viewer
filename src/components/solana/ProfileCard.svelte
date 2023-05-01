<script>
	// @ts-nocheck
	import { createQuery } from '@tanstack/svelte-query';
	import { getNFTs } from '$lib/api/solana/getNFTs.ts';
	import { fly } from 'svelte/transition';
	import { userPublicKey } from '../../lib/stores.ts';
	import '../../app.css';

	const nftsQuery = createQuery({
		queryKey: ['nfts'],
		queryFn: getNFTs
	});
</script>

{#if $nftsQuery.isLoading}
	<h2>Loading NFTs...</h2>
{:else if $nftsQuery.isError}
	<h2>Error fetching NFTs, please refresh and make sure a wallet is connected that has Minions.</h2>
{:else}
	{#each $nftsQuery.data as nft}
		<div transition:fly class="nft flex flex-col justify-center items-center bg-white p-2 mt-3">
			<img
				class="min-img w-full h-auto object-cover"
				src={nft.metadata.image}
				alt={nft.metadata.name}
				
			/>
			<div class="nft-info">
				<h4 class="min-name mt-2 text-base font-medium text-center text-black">
					{nft.metadata.name}
				</h4>
			</div>
			<div class="button-row">
			<a href="https://magiceden.io/item-details/{nft.nft.mintAddress}" target="_blank">
			<button class="market-btn me"> <img src="https://www.solanaterminal.com/media/magic-eden.png" alt=""/> </button>
			</a>
			<a href="https://exchange.art/single/{nft.nft.mintAddress}" target="_blank">
				<button class="market-btn ea"> <img src="/ea.svg" alt=""/> </button>
				</a>
			</div>
		</div>
	{/each}
{/if}

<style>
	.button-row { 
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-between;
	}
	.me {
		width: 35px;
		padding: 5px;
	}
	.market-btn  { 
		background-color: rgba(0, 0, 0, 0.4);
		display: flex;
		flex-direction: row;
		border-radius: 10px;
	}
	.ea {
		width: 120px;
		padding: 5px;
	}
	.min-name {
		text-decoration: none;
		color: rgb(87, 77, 77);
		text-shadow: 0.2px black;
	}

	.nft {
		border-radius: 10px;
		box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.4);
		transition: transform 0.2s ease-in-out;
	
	}
	.nft:hover {
		transform: translateY(-2px);
	}

	.nft img {
		border-radius: 10px;
		height: 100%;
		width: 100%;
	}
</style>
