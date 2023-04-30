<script>
	// @ts-nocheck
	import { createQuery } from '@tanstack/svelte-query';
	import { fly } from 'svelte/transition';
	import { userPublicKey } from '../../lib/stores.ts';
	import '../../app.css';
	import { getPrice } from '$lib/api/solana/getPrice.ts';

	const priceQuery = createQuery({
		queryKey: ['price'],
		queryFn: getPrice
	});
</script>
<div class="price-ticker">
    
       <h4> Sol Price {$priceQuery.data}</h4>
    
</div>
<style>
    h4 { 
       text-align: left;
       position: relative;
       left: 10px;
       top: 10px;
    }
</style>