// @ts-nocheck
import { Connection } from '@solana/web3.js';
import { Metaplex, keypairIdentity } from '@metaplex-foundation/js';
import { userPublicKey } from '../../stores';
import { get } from 'svelte/store';
import { PUBLIC_RPC_HOST } from '$env/static/public';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getNFTs = async () => {
  const publicKey = get(userPublicKey);
  const network = PUBLIC_RPC_HOST;
  const connection = new Connection(network);
  const wallet = publicKey;
  const identity = keypairIdentity(wallet);
  const metaplex = new Metaplex(connection, wallet, identity);
  const myNfts = await metaplex.nfts().findAllByOwner({
    owner: wallet,
  });

  const nfts = await Promise.all(
    myNfts.map(async (nft) => {
      try {
        const response = await fetch(nft.uri);
        const metadata = await response.json();
        if (metadata.name && metadata.image) {
          await delay(500); // Add a delay of 500ms
          return {
            nft,
            metadata,
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