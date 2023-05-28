// @ts-nocheck
import { Connection } from '@solana/web3.js';
import { Metaplex, keypairIdentity } from '@metaplex-foundation/js';
import { userPublicKey } from '../../stores';
import { get } from 'svelte/store';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getNFTs = async () => {
	const publicKey = get(userPublicKey);
	const data = await fetch("https://icarus.helius.xyz/?api-key=8bb81828-2b6b-422e-8272-8ac173443412", { 
		method: 'POST',
		headers: { 
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			jsonrpc: '2.0',
			id: '1',
			method: 'getAssetsByOwner',
			params: {
				"ownerAddress": `${publicKey}`,
				"page": 1,
				"limit": 1000
			},
	})
})
const r = await data.json()
const myNfts = await r.result.items
console.log(myNfts)
	const nfts = await Promise.all(
		myNfts.map(async (nft) => {
			try {
				const response = await fetch(nft.content.json_uri);
				const metadata = await response.json();
				if (metadata.name && metadata.image) {
					return {
						nft,
						metadata
					};
				} else {
					return null;
				}
			} catch (error) {}
		})
	).then((nfts) => nfts.filter((nft) => nft));

	return nfts;
};

export { getNFTs };
