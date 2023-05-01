<script lang="ts">
	import { walletStore as walletStore$ } from '@svelte-on-solana/wallet-adapter-core';
	import { onMount } from 'svelte';
	import {
		WalletMultiButton,
		WalletProvider,
		ConnectionProvider
	} from '@svelte-on-solana/wallet-adapter-ui';
	import {
		PhantomWalletAdapter,
		SolflareWalletAdapter,
		LedgerWalletAdapter,
		SolletWalletAdapter,
		GlowWalletAdapter
	} from '@solana/wallet-adapter-wallets';
	import '../app.css';
	import { fly } from 'svelte/transition';
	import { userPublicKey } from '$lib/stores';
	import ProfileCard from '../components/solana/ProfileCard.svelte';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import type { LayoutData } from './$types';
	import WalletModal from '../components/solana/WalletModal.svelte';
	import { get } from 'svelte/store';
	import SolanaPrice from '../components/solana/SolanaPrice.svelte';

	export let data: LayoutData;
	const userWallet = get(userPublicKey);
	let wallets;
	const localStorageKey = 'solWalletAdapter';
	onMount(async () => {
		wallets = [
			new PhantomWalletAdapter(),
			new SolflareWalletAdapter(),
			new SolletWalletAdapter(),
			new LedgerWalletAdapter(),
			new GlowWalletAdapter()
		];
	});
	$: {
		if ($walletStore$?.connected) {
			console.log('Wallet Connected.');
			userPublicKey.set($walletStore$.publicKey);
		} else {
			console.log('Wallet Not Connected.');
			userPublicKey.set('');
		}
    }
	const network = "https://light-autumn-sanctuary.solana-mainnet.discover.quiknode.pro/7779052a9ee594a9e6c09b7d5b28cca360f5685f/";
</script>
<body class="w-full h-full">
    <main class="h-full">
        <slot></slot>
        {#if !$walletStore$?.connected}
		<div class="mt-24"> </div>
        <WalletProvider {localStorageKey} {wallets} autoConnect />
								<ConnectionProvider {network} />
								<WalletMultiButton>
									<h2>connect</h2>
								</WalletMultiButton>
                                <WalletModal/>
        {:else if $walletStore$?.connected}
        <WalletProvider {localStorageKey} {wallets} autoConnect />
            <ConnectionProvider {network} />
            <WalletMultiButton/>
        <div class="mins w-full h-full mb-0 pt-0 mt-2">
			<QueryClientProvider client={data.queryClient}>
				<SolanaPrice />
			</QueryClientProvider>
            <div class="nfts grid m-5 mb-4 overflow-scroll m-auto">
                <QueryClientProvider client={data.queryClient}>
                    <ProfileCard />
                </QueryClientProvider>
            </div>
        </div>
        {/if}
		<h4 class="mt-24"> created by hosty @ minions/matr</h4>
    </main>
</body>

<style>
    body { 
        background-image: radial-gradient(#5f5555, #0e0d0d);
        margin: auto;
		display: flex;
		justify-content: center;
		flex-direction: column;
    }
    main { 
        width: 100%;
		max-width: 700px;
        margin: 0 auto;
        justify-content: center;
        display: flex;
        flex-direction: column;
    }
    :global(.wallet-adapter-button-trigger) {
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 10px;
		color: white;
		font-family: 'proxima-nova-condensed', sans-serif;
		margin: auto;
		justify-content: center;
		position: relative;
		left: 0%;
		margin-top: 3%;
        max-width: 200px;
		box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.4);
	}
    .nfts {
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		grid-gap: 10px;
		max-height: 500px;
		width: 95%;
		border-radius: 25px;
		padding-bottom: 3%;
		margin-bottom: 5%;
		margin: auto;
		margin-top: 4%;
	}
	.mins {
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 25px;
		width: 100%;
		max-width: 600px;
		display: flex;
		flex-direction: column;
		margin: auto;
		padding-bottom: 50px;
		margin-top: 5%;
	}
	
</style>
