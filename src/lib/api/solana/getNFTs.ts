// @ts-nocheck
import { Connection } from '@solana/web3.js';
import { Metaplex, keypairIdentity } from '@metaplex-foundation/js';
import { userPublicKey } from '../../stores';
import { get } from 'svelte/store';
import { PUBLIC_RPC_HOST } from '$env/static/public';

const getNFTs = async () => {
	const publicKey = get(userPublicKey);
	const network = "https://light-autumn-sanctuary.solana-mainnet.discover.quiknode.pro/7779052a9ee594a9e6c09b7d5b28cca360f5685f/";
	const connection = new Connection(network);
	const wallet = publicKey;
	const identity = keypairIdentity(wallet);
	const metaplex = new Metaplex(connection, wallet, identity);
	const myNfts = await metaplex.nfts().findAllByOwner({
		owner: wallet
	});
	const nfts = await Promise.all(
		myNfts.map(async (nft) => {
			try {
				const response = await fetch(nft.uri);
				const metadata = await response.json();
				if (
					metadata.name &&
					metadata.image 
				) {
					const collectionAddress = nft.info.tokenAmount.tokenInfo.tokenId;
					const collectionResponse = await fetch(`https://api-mainnet.magiceden.dev/v2/tokens/${collectionAddress}?`);
					const collectionData = await collectionResponse.json();
					const collectionName = collectionData.collection;
					console.log(collectionName)
					// Retrieve the floor price for the collection
					const floorResponse = await fetch(`https://api-devnet.magiceden.dev/v2/collections/${collectionName}/stats`);
					const floorData = await floorResponse.json();
					const floorPrice = floorData.data.floor;
					console.log(floorPrice)

					return {
						nft,
						metadata,
						floorPrice
					};
				} else {
					return null;
				}
			} catch (error) {
				console.log(error);
			}
		})
	).then((nfts) => nfts.filter((nft) => nft));
	return nfts;
};
export { getNFTs };
