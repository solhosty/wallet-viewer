import { get } from 'svelte/store';
import { userPublicKey } from '../../stores';

const getBalance = async () => {
	const wallet = get(userPublicKey);
	const url = `https://api.helius.xyz/v0/addresses/${wallet}/balances?api-key=8bb81828-2b6b-422e-8272-8ac173443412`;
	const response = await fetch(url);
	const data = await response.json();
	const balance = data.nativeBalance / 1000000000
	return balance.toFixed(3);
};
export { getBalance };
