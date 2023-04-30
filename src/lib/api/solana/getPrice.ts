const getPrice = async () => {
    const response = await fetch('https://public-api.birdeye.so/public/price?address=So11111111111111111111111111111111111111112');
    const data = await response.json();
    const price = data.data.value;
    console.log(price)
    return price.toFixed(2);
}

// Call the getPrice function every 20 seconds

export { getPrice };