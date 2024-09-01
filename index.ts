import axios from "axios";
import { DepthManager } from "./DepthManager";
import { cancelAll, createOrder } from "./order";

// Extracting coin name from the market symbol
const extractCoinName = (marketSymbol) => marketSymbol.split('_')[0].split('-')[1];

const coinInrMarket = new DepthManager("B-ALICE_INR");

const usdtInrMarket = new DepthManager("B-USDT_INR");

const coinUsdtMarket = new DepthManager("B-ALICE_USDT");

// Extract the coin name from the symbol
const coinName = extractCoinName("B-ALICE_INR");

setInterval(() => {
    console.log(coinInrMarket.getRelevantDepth())
    console.log(usdtInrMarket.getRelevantDepth())
    console.log(coinUsdtMarket.getRelevantDepth())
    // there are two sides you can sit on
    // sell crypto for INR, buy USDT from INR, buy crypto from INR
    // lets say u start with 1 coin of your choice
    const canGetInr = coinInrMarket.getRelevantDepth().lowestAsk - 0.001;
    const canGetUsdt = canGetInr / usdtInrMarket.getRelevantDepth().lowestAsk;
    const canGetSol = canGetUsdt / coinUsdtMarket.getRelevantDepth().lowestAsk;
    
    console.log(`You can convert ${1} ${coinName} into ${canGetSol} ${coinName}`)

    // Buy crypto from INR, sell crypto for USDT, sell USDT for INR.
    const initialInr = coinInrMarket.getRelevantDepth().highestBid + 0.001;
    const canGetUsdt2 = coinUsdtMarket.getRelevantDepth().highestBid;
    const canGetInr2 = canGetUsdt2 * usdtInrMarket.getRelevantDepth().highestBid;

    console.log(`You can convert ${initialInr} INR into ${canGetInr2} INR`)
}, 2000)

// async function main() {
//     const highestBid = coinInrMarket.getRelevantDepth().highestBid;
//     console.log(`placing order for ${parseFloat(highestBid) + 0.01}`);
//     await createOrder("buy", "XAIINR", (parseFloat(highestBid) + 0.01).toFixed(3), 10, Math.random().toString())
//     await new Promise((r) => setTimeout(r, 10000));
//     await cancelAll("XAIINR");
//     await new Promise((r) => setTimeout(r, 1000));
//     main();
// }

// setTimeout(async () => {
//     main();
// }, 2000)
