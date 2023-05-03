import axios from 'axios';

const HELIUS_RPC = 'https://rpc-devnet.helius.xyz/?api-key=8bb81828-2b6b-422e-8272-8ac173443412';

export async function getAsset(assetId: any, rpcUrl = HELIUS_RPC): Promise<any> {
	try {
		const axiosInstance = axios.create({
			baseURL: rpcUrl
		});
		const response = await axiosInstance.post(rpcUrl, {
			jsonrpc: '2.0',
			method: 'getAsset',
			id: 'rpd-op-123',
			params: {
				id: assetId
			}
		});
		console.log(response.data.result)
		return response.data.result;
	} catch (error) {
		console.error(error);
	}
}

export async function getAssetProof(assetId: any, rpcUrl = HELIUS_RPC): Promise<any> {
	try {
		const axiosInstance = axios.create({
			baseURL: rpcUrl
		});
		const response = await axiosInstance.post(rpcUrl, {
			jsonrpc: '2.0',
			method: 'getAssetProof',
			id: 'rpd-op-123',
			params: {
				id: assetId
			}
		});
		return response.data.result;
	} catch (error) {
		console.error(error);
	}
}

export async function getAssetsByOwner(
	assetId: string,
	sortBy: any,
	limit: number,
	page: number,
	before: string,
	after: string
): Promise<any> {
	try {
		const response = await axios.post(this.rpcUrl, {
			jsonrpc: '2.0',
			method: 'get_assets_by_owner',
			id: 'compression-example',
			params: [assetId, sortBy, limit, page, before, after]
		});
		return response.data.result;
	} catch (error) {
		console.error(error);
	}
}
