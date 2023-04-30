<script>
	// @ts-nocheck
	import { createQuery } from '@tanstack/svelte-query';
	import { fly } from 'svelte/transition';
	import { userPublicKey } from '../../lib/stores.ts';
	import '../../app.css';
	import { getPrice } from '$lib/api/solana/getPrice.ts';
	import { getNFTs } from '$lib/api/solana/getNFTs.ts';

	const priceQuery = createQuery({
		queryKey: ['price'],
		queryFn: getPrice
	});
    const nftQuery = createQuery({
        queryKey: ['nfts'],
        queryFn: getNFTs
    });
</script>

<div class="price-ticker">
       <h4> <img src="https://raw.githubusercontent.com/birdeye-so/birdeye-ads/main/network/solana.png" alt="">  Sol Price ${$priceQuery.data}</h4>
       <h4> nfts owned - {$nftQuery.data.length} </h4>
    
</div>
<style>
    img { 
        width: 20px;
        margin-right: 1%;
    }
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