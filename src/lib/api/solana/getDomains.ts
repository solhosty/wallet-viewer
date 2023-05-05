import { userPublicKey } from "../../stores"
import { get } from "svelte/store"

const getDomain = async () => {
    const wallet = get(userPublicKey)
    const url = `https://api.helius.xyz/v0/addresses/${userPublicKey}/names?api-key=8bb81828-2b6b-422e-8272-8ac173443412`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    return data
}

export {getDomain}